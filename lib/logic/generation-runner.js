'use strict';

const data = require('../helpers/data');
const Tournament = require('./selection/tournament');

class GenerationRunner
{
  constructor(options) {
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

    this.limit = options.limit;
    this.generationSize = options.iterations;
    this.run = options.run;
    this.score = options.score || identity;

    this.params = new data.ArgumentGenerator(options.params);

    // TODO: Null checking/interface checking...
    this.selection = options.selection;
    this.breeder = options.breeder;
  }

  start() {
    
  }

  _step(prevGen) {
    let currentGen;
    if (prevGen) {
      let parents = this.selection.select(prevGen);
      currentGen = this.breeder.breed(parents);
    } else {
      currentGen = this.params.getValues(this.generationSize);
    }

    // TODO: Run and score each child in generation.
    // TODO: Aggregate and store the results.
  }

  _breed(prevGen) {
    
  }
}