'use strict';

class PromiseHelper
{
  constructor() {

  }

  series(handlers) {
    if (!((functions instanceof Array))) {
      throw new Error(`'handlers' must be an array of functions!`);
    }
    
    let p = Promise.resolve();

    functions.forEach(fn => {
      p = p.then(fn);
    });

    return p;    
  }

  times(fn, times) {
    if (typeof times !== 'number') {
      throw new Error(`'times' must be an integer!`);
    }

    if (times <= 0) {
      throw new Error(`'times' must be greater than 0!`)
    }    

    let p = Promise.resolve();

    for (let i = 0; i < times; i++){
      p = p.then(() => fn(i));
    }

    return p;
  }  
}

module.exports = new PromiseHelper();