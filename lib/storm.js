'use strict';

const data = require('./helpers/data');

const identity = (result) => {return result};

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
        options.params[prop] = new data.ListGenerator(options.params[prop]);
      }
    }
    
    this.params = new data.ArgumentGenerator(options.params);
  }

  // WIP: Rough draft, untested...
  start()
  {
    // TODO: Implement iterations...
    
    let results = [];
    
    let promise = Promise.resolve();
      
      for(let unit in this.params.getUnits()){
        promise.then(() => {
          let start = time.current;
          promise = this.run.call(unit, unit);
          
          if(typeof promise.then !== 'function'){
            throw new Error(`'run' function must return a promise!`);
          }
          
          promise.then(result => {
            results.push({
              iteration: i,
              success: true,
              time: time.current - start,
              params: unit,
              result,
              score: this.score(result)
            });
          })
          .catch(err => {
            results.push({
              iteration: i,
              success: false,
              time: time.current - start,
              params: unit,
              result: err
            });
          });
        });
      }

      // Finally return the last promise with the results.    
      return promise.then(() => results);
  }
  
  static list(values){
    return new data.ListGenerator(values);
  }
  
  static numberRange(min, count, step){
    return new data.NumberRangeGenerator(min, count, step || 1);
  }
  
  static randomInt(min, max, count){
    return new data.RandomNumberGenerator(min, max, count, true);
  }
  
  static randomFloat(min, max, count){
    return new data.RandomNumberGenerator(min, max, count, false);
  }
}

module.exports = Storm;