'use strict';

import test from 'ava';

import {
  NumberRangeGenerator,
  RandomNumberGenerator,
  ListGenerator,
  ArgumentGenerator
} from './data';

// NumberRangeGenerator ####################################

test('NumberRangeGenerator step should default to 1', t => {
  const nr = new NumberRangeGenerator(0, 5);

  t.is(nr.step, 1);  
});

test('NumberRangeGenerator should began with min', t => {
  const MIN = 4;
  const nr = new NumberRangeGenerator(MIN, 10);

  const firstvalue = nr.getValues().next().value;

  t.is(firstvalue, MIN);  
});

test('NumberRangeGenerator should increase by step', t => {
  const STEP = 2;
  const MIN = 0;
  const nr = new NumberRangeGenerator(MIN, 10, STEP);

  let currentIndex = 0;

  for (let val of nr.getValues()) {
    t.is(val, (currentIndex * STEP) + MIN);
    currentIndex++;
  }
});

test('NumberRangeGenerator maximum should be exclusive', t => {
  const MIN = 6;
  const COUNT = 3;
  const STEP = 1;
  const expectedValue = MIN + (COUNT * STEP) - 1;
  const nr = new NumberRangeGenerator(MIN, COUNT, STEP);

  let lastValue;

  for (let val of nr.getValues()) {
    lastValue = val;
  }

  t.is(lastValue, expectedValue);
});


// RandomNumberGenerator ###################################

test('RandomNumberGenerator should require a count', t => {
  const MIN = 0;
  const MAX = 1;

  t.throws(() => new RandomNumberGenerator(MIN, MAX), `'count' is required!`);
});

test('RandomNumberGenerator isInteger should default to false', t => {
  const MIN = 0;
  const MAX = 1;
  const COUNT = 10;
  const rn = new RandomNumberGenerator(MIN, MAX, COUNT);

  t.false(rn.isInteger);  
});

test('RandomNumberGenerator should keep within range', t => {
  const MIN = 0;
  const MAX = 1;
  const COUNT = 10000;
  const rn = new RandomNumberGenerator(MIN, MAX, COUNT);

  for (let val of rn.getValues()) {
    t.true(val >= MIN && val < MAX);
  }  
});

test('RandomNumberGenerator should allow integers only', t => {
  const MIN = 0;
  const MAX = 1;
  const COUNT = 10000;
  const rn = new RandomNumberGenerator(MIN, MAX, COUNT, true);

  for (let val of rn.getValues()) {
    t.is(Math.abs(val - Math.floor(val)), 0);
  }  
});


// ListGenerator ######################################

test('ListGenerator should require array', t => {
  t.throws(() => new ListGenerator(), `'values' is required!`);
});

test('ListGenerator should require an array with at least one element', t => {
  t.throws(() => new ListGenerator([]), `'values' must have at least one element!`);
  t.notThrows(() => new ListGenerator([1]));
});

test('ListGenerator should iterate through each element', t => {
  const EXPECTED_VALUES = [1, 1, 2, 3, 5, 8];
  const ooe = new ListGenerator(EXPECTED_VALUES);

  let currentIndex = 0;  
  for (let val of ooe.getValues()) {
    t.is(val, EXPECTED_VALUES[currentIndex++]);
  }
});


// ArgumentGenerator ############################

test('ArgumentGenerator requires an object hash', t => {
  const PARAMS = {};

  const pc = new ArgumentGenerator(PARAMS);

  t.is(pc.params, PARAMS);  
});

test('ArgumentGenerator returns a populated instance when enumerating', t => {
  const EXPECTED_VALUE = {
    a: 1,
    b: 2
  };

  const PARAMS = {
    a: new NumberRangeGenerator(1, 3),
    b: new NumberRangeGenerator(2, 4, 2)
  };

  const pc = new ArgumentGenerator(PARAMS);

  let unit = pc.getUnits().next().value;

  t.same(unit, EXPECTED_VALUE);
});

test('ArgumentGenerator iterates through all possible enumerations', t => {
  const COUNT1 = 2;
  const COUNT2 = 3;
  const COUNT3 = 4;
  const EXPECTED_COUNT = COUNT1 * COUNT2 * COUNT3;

  const PARAMS = {
    a: new NumberRangeGenerator(1, COUNT1),
    b: new NumberRangeGenerator(1, COUNT2),
    c: new NumberRangeGenerator(1, COUNT3)
  };

  const pc = new ArgumentGenerator(PARAMS);

  let total = 0;
  for (let val of pc.getUnits()) {
    //console.log(`${total} ::`, val);
    total++;
  }

  t.is(total, EXPECTED_COUNT);
});