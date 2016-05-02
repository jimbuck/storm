
import test from 'ava';

import {
  BaseGenerator,
  OrderedNumber,
  RandomNumber,
  RandomInteger,
  RandomFloat,
  OrderedItem,
  ArgumentGenerator
} from './data';

// BaseGenerator ####################################

test('BaseGenerator nextValue should auto-instantiate generator', t => {
  const bg = new BaseGenerator();
  bg.getValues = function* () { yield 42; };
  
  bg.nextValue();
  t.not(typeof bg.iterator, 'undefined');
});

test('BaseGenerator nextValue should return the next value', t => {
  const EXPECTED_VALUE = 42;
  const bg = new BaseGenerator();

  bg.getValues = function* () { yield EXPECTED_VALUE; };

  let result = bg.nextValue();
  t.is(result, EXPECTED_VALUE);
});

test('BaseGenerator nextValues should return list of values', t => {
  const SOURCE_VALUES = [6, 0, 1, 4];
  const EXPECTED_VALUES = [6, 0, 1];
  
  const bg = new BaseGenerator();
  bg.getValues = function* () {
    for (let i = 0; i < SOURCE_VALUES.length; i++) {
      yield SOURCE_VALUES[i];
    }
  };

  let result = bg.nextValues(3);
  t.deepEqual(result, EXPECTED_VALUES);
});

test('BaseGenerator nextValues should wrap list of values if greater than source', t => {
  const SOURCE_VALUES = [6, 0, 1, 4];
  const EXPECTED_VALUES = [6, 0, 1, 4, 6, 0];

  const bg = new BaseGenerator();
  bg.getValues = function* () {
    for (let i = 0; ;i=(i+1)%SOURCE_VALUES.length) {
      yield SOURCE_VALUES[i];
    }
  };

  let result = bg.nextValues(6);
  t.deepEqual(result, EXPECTED_VALUES);
});

// OrderedNumber ####################################

test('OrderedNumber step should default to 1', t => {
  const nr = new OrderedNumber(0, 5);

  t.is(nr.step, 1);
});

test('OrderedNumber should began with min', t => {
  const MIN = 4;
  const nr = new OrderedNumber(MIN, 10);

  const firstvalue = nr.nextValue();

  t.is(firstvalue, MIN);
});

test('OrderedNumber should repeat infinitely', t => {
  const MIN = 0;
  const MAX = 10;
  const STEP = 2;
  const on = new OrderedNumber(MIN, MAX, STEP);

  let currentIndex = 0;

  for (let val of on.getValues()) {
    t.is(typeof val, 'number');
    currentIndex++;
    if (currentIndex > 100) break;
  }
});

test('OrderedNumber should increase by step', t => {
  const STEP = 2;
  const MIN = 1;
  const MAX = 8;
  const EXPECTED_VALUES = [1, 3, 5, 7];

  const on = new OrderedNumber(MIN, MAX, STEP);

  let currentIndex = 0;
  for (let val of on.getValues()) {
    t.is(val, EXPECTED_VALUES[currentIndex % EXPECTED_VALUES.length]);
    if (currentIndex++ > 100) break;
  }
});

test('OrderedNumber maximum should be inclusive', t => {
  const MIN = 6;
  const MAX = 9;
  const STEP = 1;
  const EXPECTED_COUNT = (MAX - MIN) / STEP;
  const on = new OrderedNumber(MIN, MAX, STEP);

  let lastValue;
  let currentIndex = 0;

  for (let val of on.getValues()) {
    lastValue = val;
    if (currentIndex++ >= EXPECTED_COUNT) break;
  }

  t.is(lastValue, MAX);
});


// RandomNumber ###################################

test('RandomNumber isInteger should default to false', t => {
  const MIN = 0;
  const MAX = 1;

  const rn = new RandomNumber(MIN, MAX);

  t.false(rn.isInteger);
});

test('RandomNumber should keep within range', t => {
  const MIN = 0;
  const MAX = 1;
  let i = 10000;
  const rn = new RandomNumber(MIN, MAX);

  while (i-- > 0) {
    let val = rn.nextValue();
    t.true(val >= MIN && val < MAX);
  }
});

test('RandomNumber should allow integers only', t => {
  const MIN = 0;
  const MAX = 1;
  let i = 10000;
  const rn = new RandomNumber(MIN, MAX, true);

  while (i-- > 0) {
    let val = rn.nextValue();
    t.is(Math.abs(val - Math.floor(val)), 0);
  }
});


// OrderedItem ######################################

test('OrderedItem should require an array during construction', t => {
  t.throws(() => new OrderedItem(), `'values' is required!`);
  t.notThrows(() => new OrderedItem([1]));
});

test('OrderedItem should require an array with at least one element', t => {
  t.throws(() => new OrderedItem([]), `'values' must have at least one element!`);
  t.notThrows(() => new OrderedItem([1]));
});

test('OrderedItem should iterate through each element', t => {
  const EXPECTED_VALUES = ['alfa', 'beta', 'charlie', 'delta', 'echo', 'foxtrot'];
  const oi = new OrderedItem(EXPECTED_VALUES);

  let currentIndex = 0;
  for (let val of oi.getValues()) {
    t.is(val, EXPECTED_VALUES[currentIndex % EXPECTED_VALUES.length]);
    if (currentIndex++ > EXPECTED_VALUES.length * 2) break;
  }
});

// ArgumentGenerator ############################

test(`ArgumentGenerator requires 'params' during construction`, t => {
  t.throws(
    () => new ArgumentGenerator(),
    `'params' is required!`);
})

test('ArgumentGenerator requires at least one property on param', t => {
  const PARAMS = {};

  t.throws(
    () => new ArgumentGenerator({}),
    `At least one property on 'param' must be defined to produce a unit!`);
});

test('ArgumentGenerator returns a populated instance when enumerating', t => {
  const EXPECTED_VALUE = {
    a: 1,
    b: 2
  };

  const PARAMS = {
    a: new OrderedNumber(1, 3),
    b: new OrderedNumber(2, 4, 2)
  };

  const pc = new ArgumentGenerator(PARAMS);

  let unit = pc.nextValue();

  t.deepEqual(unit, EXPECTED_VALUE);
});