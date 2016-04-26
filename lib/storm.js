'use strict';

const stream = require('stream');

const data = require('./helpers/data');

const time = require('./helpers/time');
const promise = require('./helpers/promise');

const GenerationRunner = require('./logic/generation-runner');

const identity = (result) => {return result};

let taskId = 0;

class Storm extends stream.Readable
{
  constructor(options)
  {
    if (typeof options === 'undefined') {
      throw new Error(`Options must be specified!`);
    }

    if (typeof options.params === 'undefined') {
      throw new Error(`'params' must be specified!`);
    }

    if (typeof options.limit === 'undefined') {
      throw new Error(`'limit' must be specified!`);
    }

    if (typeof options.generationSize === 'undefined') {
      throw new Error(`'generationSize' must be specified!`);
    }

    if (typeof options.run !== 'function') {
      throw new Error(`'run' must be specified!`);
    }

    super({ objectMode: true });
    
    this.params = new data.ArgumentGenerator(options.params); 

    this.isStream = false;
    this.isPromise = false;
    this.limit = options.limit;
    
    if (typeof options.limit === 'number') {
      this.limit = (function (num) {
        return function (i) {
          return i >= num;
        };
      })(options.limit);
    }
  }

  _read() {
    if (this.isPromise) {
      throw new Error(`'Once 'start' is called you cannot stream!`);
    }
    this.isStream = true;
    
    this.step().then(result => {
      if (result) {
        this.push(result);
      } else {
        this.push(null);
      }
    });  
  }

  start() {
    if (this.isStream) {
      throw new Error(`'Once 'pipe' is called you cannot use promises!`);
    }
    this.isPromise = true;
    
    this._results = [];
    return this._stepUntilDone();
  }

  _stepUntilDone() {
    return this.step().then(result => {
      if (result) {
        this._results.push(result);
        return this._stepUntilDone();
      } else {
        return this._results;
      }
    });
  }

  // TODO: Convert to run 1 generation at a time...  
  step() {
    let id = taskId++;
    //console.log(`Starting task ${id}...`);
    let unit = this.params.nextValue();

    // Stop when all units have been processed...    
    if (typeof unit === 'undefined') {     
      return Promise.resolve(null);
    }

    let startTime = time.current;
    let p;

    try {
      p = Promise.resolve(this.run.call(unit, unit));
    } catch (ex) {
      p = Promise.reject(ex);
    }

    return p
      .then(result => {
        //console.log(`Resolved task ${id}! ${JSON.stringify(result)}`);
        let timeDiff = time.current - startTime;
        let score;
        try {
          score = this.score(result);
        } catch (ex) {
          ex.innerMessage = ex.message;
          ex.message = `'storm.score' failed!`;
          ex.data = result;

          throw ex;
        }

        return {
          id: id,
          iteration: this._currentIteration,
          success: true,
          time: timeDiff,
          params: unit,
          result,
          score: this.score(result)
        };
      }).catch(err => {
        //console.log(`Rejected task ${id}!`);
        let timeDiff = time.current - startTime;
        return {
          id: id,
          iteration: this._currentIteration,
          success: false,
          time: timeDiff,
          params: unit,
          result: err,
          score: null // Should this be zero? -1?
        };
      });
  }  
}

module.exports = {
  Storm,
  OrderedNumber: data.OrderedNumber,
  RandomInteger: data.RandomInteger,
  RandomFloat: data.RandomFloat,
  OrderedItem: data.OrderedItem
};