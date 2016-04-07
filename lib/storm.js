'use strict';

const data = require('./helpers/data');
const NumberRangeGenerator = data.NumberRangeGenerator;
const RandomNumberGenerator = data.RandomNumberGenerator;
const ListGenerator = data.ListGenerator;
const ArgumentGenerator = data.ArgumentGenerator;

const time = require('./helpers/time');
const promise = require('./helpers/promise');

const identity = (result) => {return result};

let taskId = 0;

class Storm
{
  constructor(options)
  {
    if(typeof options === 'undefined')
    {
      throw new Error(`Options must be specified!`);
    }
      
    if(typeof options.params === 'undefined')
    {
      throw new Error(`'params' must be specified!`);
    }
    
    if(typeof options.run !== 'function'){
      throw new Error(`'run' must be specified!`);
    }
    
    this.iterations = options.iterations || 1;
    this.run = options.run;
    this.score = options.score || identity;
    
    for(let prop in options.params){      
      if(options.params[prop] instanceof Array){
        options.params[prop] = new ListGenerator(options.params[prop]);
      }
    }
    
    this.params = new ArgumentGenerator(options.params);
  }

  // WIP: Rough draft, untested...
  start()
  {
    this._results = [];

    return promise
      .times(i => {
        this._gen = this.params.getUnits();
        this._currentIteration = i;

        return this.step();
      }, this.iterations)
      .then(() => this._results);
  }

  step() {
    let id = taskId++;
    //console.log(`Starting task ${id}...`);
    let unit = this._gen.next().value;

    // Stop when all units have been processed...    
    if (typeof unit === 'undefined') {
      return;
    }

    let startTime = time.current;
    let p = this.run.call(unit, unit);

    if (!p.then || typeof p.then !== 'function') {
      p = Promise.resolve(p);
    }

    return p
      .then(result => {
        //console.log(`Resolved task ${id}! ${JSON.stringify(result)}`);
        let timeDiff = time.current - startTime;
        this._results.push({
          id: id,
          iteration: this._currentIteration,
          success: true,
          time: timeDiff,
          params: unit,
          result,
          score: this.score(result)
        });
        
        return this.step();
      })
      .catch(err => {
        //console.log(`Rejected task ${id}!`);
        let timeDiff = time.current - startTime;
        this._results.push({
          id: id,
          iteration: this._currentIteration,
          success: false,
          time: timeDiff,
          params: unit,
          result: err
        });
        
        return this.step();
      })
  }
  
  static list(values){
    return new ListGenerator(values);
  }
  
  static numberRange(min, count, step){
    return new NumberRangeGenerator(min, count, step || 1);
  }
  
  static randomInt(min, max, count){
    return new RandomNumberGenerator(min, max, count, true);
  }
  
  static randomFloat(min, max, count){
    return new RandomNumberGenerator(min, max, count, false);
  }
}

module.exports = Storm;