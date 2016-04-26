'use strict';

class BaseSelection
{
  constructor(options) {
    
  }

  select(gen, count) {
    if (!(gen instanceof Array)) {
      throw new Error(`'gen' must be an array!`);
    }

    if (typeof count !== 'number' || count < 1) {
      throw new Error(`'count' must be a positive number!`);
    }
  }

  compare(a, b) {
    // If b is undefined...
    if (a && !b) {
      return a;
    }
    
    // If a is undefined...
    if (b && !a) {
      return b;
    }

    // If a has a greater score...    
    if (a.score > b.score) {
      return a;
    }
    
    // If b has a greater score...
    if (b.score > a.score) {
      return b;
    }
  
    // Otherwise return the first one...    
    return a;
  }
}

module.exports = BaseSelection;