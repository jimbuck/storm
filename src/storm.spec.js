import test from 'ava';

import {
  IStormConfig,
  Storm,
  RandomInteger,
  RandomFloat
} from './storm';

const toArray = require('stream-to-array'); // required for older modules...

const GENERATION_SIZE = 5;
const GENERATION_LIMIT = 10;
const EXPECTED_RESULT_COUNT = GENERATION_SIZE * GENERATION_LIMIT;
const DELAY = 200;

test.beforeEach(t => {

  // Create a basic set of options to use for testing.  
  t.context.options = {
    generationSize: GENERATION_SIZE,
    done: GENERATION_LIMIT,
    params: {
      a: new RandomFloat(-1, 1),
      b: new RandomInteger(-10, 10),
      c: new RandomFloat(0, 20)
    },
    run: (params) => {
      return (2 * Math.pow(params.a, 2)) + (3 * params.b) + params.c; // Returns some result...
    },
    score: function (result) {
      return result; // Convert results into scores (if not already numerical)
    }
  }

  t.context.storm = new Storm(t.context.options);
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
  delete t.context.options.params;
  t.throws(() => {
    new Storm(t.context.options);
  }, `'params' must be specified!`);
});

test(`Storm requires a 'run' function`, t => {
  delete t.context.options.run;
  t.throws(() => {
    new Storm(t.context.options);
  }, `'run' must be specified!`);
});

test(`Storm requires a 'done' property`, t => {
  delete t.context.options.done;
  t.throws(() => {
    new Storm(t.context.options);
  }, `'done' must be specified!`);
});

test(`Storm allows 'done' to be a function`, t => {
  let limitTicker = 0;

  t.context.options.done = function (i) {
    return i >= 3;
  };
  
  let storm = new Storm(t.context.options);

  t.is(typeof storm.done, 'function');
  t.is(storm.done, t.context.options.done);
});

// Promise-based Tests....

test('Storm<Promise> run should accept return values', async (t) => {
  const INPUTS = { a: 1, b: 4, c: 0.5 };
  const OUTPUT = 14.5;
  let result = await t.context.storm.run(INPUTS);

  t.is(typeof result, 'number');
  t.is(result, OUTPUT);
});

test('Storm<Promise> run should accept promises', async (t) => {

  t.context.storm.run = (params) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve((params.a * params.b) / params.c);
      }, DELAY);
    });
  };

  const INPUTS = { a: 1, b: 4, c: 0.5 };
  const OUTPUT = 8;
  let result = await t.context.storm.run(INPUTS);

  t.is(typeof result, 'number');
  t.is(result, OUTPUT);
});

test('Storm<Promise> run should handle exceptions', async (t) => {

  t.context.storm.run = (params) => {
    throw new Error(`Some lame error!`);
  };

  let gen = await t.context.storm.step();

  t.true(gen[0].result instanceof Error);
  t.false(gen[0].success);
  t.is(gen[0].score, 0);
});

// Stream based tests...

test.skip('Storm<Stream> run should accept return values', t => {

  return toArray(t.context.storm).then(results => {
    t.true(results instanceof Array);
    t.is(results.length, EXPECTED_RESULT_COUNT);
  });
});

test.skip('Storm<Stream> run should accept promises', t => {
  
  t.context.storm.run = (params) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve((params.a * params.b) / params.c);
      }, DELAY);
    });
  };

  return toArray(t.context.storm).then(results => {
    t.true(results instanceof Array);
    t.is(results.length, EXPECTED_RESULT_COUNT);
  });
});

test.skip('Storm<Stream> run should handle exceptions', t => {

  t.context.storm.run = (params) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error(`Some lame error!`));
      }, DELAY);
    });
  };

  return toArray(t.context.storm).then(results => {
    t.true(results instanceof Array);
    t.true(results[0].result instanceof Error);
    t.is(results.length, EXPECTED_RESULT_COUNT);
  });
});