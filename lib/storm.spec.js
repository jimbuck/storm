'use strict';

import test from 'ava';

import {Storm, RandomInteger, RandomFloat} from './storm';

import toArray from 'stream-to-array';

let options = {};
const EXPECTED_RESULT_COUNT = 18; // Derived from params below...
const DELAY = 50;

test.beforeEach(() => {

  // Create a basic set of options to use for testing.  
  options = {
    generationSize: 5,
    limit: 10,
    params: {
      a: new RandomFloat(-1, 1),
      b: new RandomInteger(-10, 10),
      c: new RandomFloat(0, 20)
    },
    run: (params) => {
      return (2 * Math.pow(params.a, 2)) + (3 * params.b) + params.c; // Returns some result...
    },
    score: function(result) {
      return result; // Convert results into scores (if not already numerical)
    }
  }
});

test('Storm returns a constructor function', t => {
  t.is(typeof Storm, 'function');
});

test('Storm requires an options object', t => {
  t.throws(() => {
    new Storm();
  }, `Options must be specified!`);
});

test(`Storm requires a 'params' definition`, t => {
  delete options.params;
  t.throws(() => {
    new Storm(options);
  }, `'params' must be specified!`);
});

test(`Storm requires a 'run' function`, t => {
  delete options.run;
  t.throws(() => {
    new Storm(options);
  }, `'run' must be specified!`);
});

test(`Storm requires a 'limit' property`, t => {
  delete options.limit;
  t.throws(() => {
    new Storm(options);
  }, `'limit' must be specified!`);
});

test(`Storm allows 'limit' to be a generation count`, t => {
  options.limit = 11;
  let storm = new Storm(options);

  t.is(typeof storm.limit, 'function');
});

test(`Storm allows 'limit' to be a function`, t => {
  let limitTicker = 0;

  options.limit = function(i) {
    return i >= 3;
  };
  let storm = new Storm(options);

  t.is(typeof storm.limit, 'function');
  t.is(storm.limit, options.limit);
});

// Promise-based Tests....

test.skip('Storm<Promise> run should accept return values', t => {
  let storm = new Storm(options);

  return storm.start().then(results => {
    t.true(results instanceof Array);
    t.is(results.length, EXPECTED_RESULT_COUNT);
  });
});

test.skip('Storm<Promise> run should accept promises', t => {
  
  options.run = (params) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve((params.a * params.b) / params.c);
      }, DELAY);
    });
  };

  let storm = new Storm(options);

  return storm.start().then(results => {
    t.true(results instanceof Array);
    t.is(results.length, EXPECTED_RESULT_COUNT);
  });
});

test.skip('Storm<Promise> run should handle exceptions', t => {
  
  options.run = (params) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error(`Some lame error!`));
      }, DELAY);
    });
  };

  let storm = new Storm(options);

  return storm.start().then(results => {
    t.true(results instanceof Array);
    t.true(results[0].result instanceof Error);
    t.is(results.length, EXPECTED_RESULT_COUNT);
  });
});

// Stream based tests...

test.skip('Storm<Stream> run should accept return values', t => {
  let storm = new Storm(options);

  return toArray(storm).then(results => {
    t.true(results instanceof Array);
    t.is(results.length, EXPECTED_RESULT_COUNT);
  });
});

test.skip('Storm<Stream> run should accept promises', t => {
  
  options.run = (params) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve((params.a * params.b) / params.c);
      }, DELAY);
    });
  };

  let storm = new Storm(options);

  return toArray(storm).then(results => {
    t.true(results instanceof Array);
    t.is(results.length, EXPECTED_RESULT_COUNT);
  });
});

test.skip('Storm<Stream> run should handle exceptions', t => {
  
  options.run = (params) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error(`Some lame error!`));
      }, DELAY);
    });
  };

  let storm = new Storm(options);

  return toArray(storm).then(results => {
    t.true(results instanceof Array);
    t.true(results[0].result instanceof Error);
    t.is(results.length, EXPECTED_RESULT_COUNT);
  });
});