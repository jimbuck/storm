'use strict';

import test from 'ava';

import Storm from './storm';

let options = {};
const EXPECTED_RESULT_COUNT = 60; // Derived from params below...

test.beforeEach(() => {

  // Create a basic set of options to use for testing.  
  options = {
    iterations: 10,
    params: {
      a: Storm.numberRange(1, 2),   // [1,2]
      b: Storm.numberRange(7, 1),   // [7]
      c: Storm.numberRange(0, 3, 2) // [0,2,4]
    },
    run: (params) => {
      return (params.a * params.b) / params.c; // Returns some result...
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

test('Storm defaults to an iteration count of 1', t => {
  delete options.iterations;
  let storm = new Storm(options);
  t.is(storm.iterations, 1);  
});

test('Storm requires a params definition', t => {
  delete options.params;
  t.throws(() => {
    new Storm(options);
  }, `'params' must be specified!`);
});

test('Storm requires a run function', t => {
  delete options.run;
  t.throws(() => {
    new Storm(options);
  }, `'run' must be specified!`);
});

test('Storm run should accept return values', t => {
  let storm = new Storm(options);

  return storm.start().then(results => {
    t.true(results instanceof Array);
    t.is(results.length, EXPECTED_RESULT_COUNT);
  });
});

test('Storm run should accept promises', t => {
  
  options.run = (params) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve((params.a * params.b) / params.c);
      }, 100);
    });
  };

  let storm = new Storm(options);

  return storm.start().then(results => {
    t.true(results instanceof Array);
    t.is(results.length, EXPECTED_RESULT_COUNT);
  });
});

test('Storm run should handle exceptions', t => {
  
  options.run = (params) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error(`Some lame error!`));
      }, 100);
    });
  };

  let storm = new Storm(options);

  return storm.start().then(results => {
    t.true(results instanceof Array);
    t.is(results.length, EXPECTED_RESULT_COUNT);
  });
});