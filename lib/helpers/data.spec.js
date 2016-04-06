'use strict';

import test from 'ava';

import {
  NumberRange,
  RandomNumber,
  OneOfEach,
  ParameterCollection
} from './data';

// NumberRange ####################################

test('NumberRange step should default to 1', t => {
  const nr = new NumberRange(0, 5);

  t.is(nr.step, 1);  
});

test('NumberRange should began with min', t => {
  const MIN = 4;
  const nr = new NumberRange(MIN, 10);

  const firstvalue = nr.getValues().next().value;

  t.is(firstvalue, MIN);  
});

test('NumberRange should increase by step', t => {
  const STEP = 2;
  const MIN = 0;
  const nr = new NumberRange(MIN, 10, STEP);

  let currentIndex = 0;

  for (let val of nr.getValues()) {
    t.is(val, (currentIndex * STEP) + MIN);
    currentIndex++;
  }
});

test('NumberRange maximum should be exclusive', t => {
  const MIN = 6;
  const COUNT = 3;
  const STEP = 1;
  const expectedValue = MIN + (COUNT * STEP) - 1;
  const nr = new NumberRange(MIN, COUNT, STEP);

  let lastValue;

  for (let val of nr.getValues()) {
    lastValue = val;
  }

  t.is(lastValue, expectedValue);
});


// RandomNumber ###################################

test('RandomNumber should require a count', t => {
  const MIN = 0;
  const MAX = 1;

  t.throws(() => new RandomNumber(MIN, MAX), `'count' is required!`);
});

test('RandomNumber isInteger should default to false', t => {
  const MIN = 0;
  const MAX = 1;
  const COUNT = 10;
  const rn = new RandomNumber(MIN, MAX, COUNT);

  t.false(rn.isInteger);  
});

test('RandomNumber should keep within range', t => {
  const MIN = 0;
  const MAX = 1;
  const COUNT = 10000;
  const rn = new RandomNumber(MIN, MAX, COUNT);

  for (let val of rn.getValues()) {
    t.true(val >= MIN && val < MAX);
  }  
});

test('RandomNumber should allow integers only', t => {
  const MIN = 0;
  const MAX = 1;
  const COUNT = 10000;
  const rn = new RandomNumber(MIN, MAX, COUNT, true);

  for (let val of rn.getValues()) {
    t.is(Math.abs(val - Math.floor(val)), 0);
  }  
});


// OneOfEach ######################################

test('OneOfEach should require array', t => {
  t.throws(() => new OneOfEach(), `'values' is required!`);
});

test('OneOfEach should require an array with at least one element', t => {
  t.throws(() => new OneOfEach([]), `'values' must have at least one element!`);
  t.notThrows(() => new OneOfEach([1]));
});

test('OneOfEach should iterate through each element', t => {
  const EXPECTED_VALUES = [1, 1, 2, 3, 5, 8];
  const ooe = new OneOfEach(EXPECTED_VALUES);

  let currentIndex = 0;  
  for (let val of ooe.getValues()) {
    t.is(val, EXPECTED_VALUES[currentIndex++]);
  }
});


// ParameterCollection ############################

test('ParameterCollection requires an object hash', t => {
  const PARAMS = {};

  const pc = new ParameterCollection(PARAMS);

  t.is(pc.params, PARAMS);  
});

test('ParameterCollection returns a populated instance when enumerating', t => {
  const EXPECTED_VALUE = {
    a: 1,
    b: 2
  };

  const PARAMS = {
    a: new NumberRange(1, 3),
    b: new NumberRange(2, 4, 2)
  };

  const pc = new ParameterCollection(PARAMS);

  let unit = pc.getUnits().next().value;

  t.same(unit, EXPECTED_VALUE);
});

test('ParameterCollection iterates through all possible enumerations', t => {
  const COUNT1 = 2;
  const COUNT2 = 3;
  const COUNT3 = 4;
  const EXPECTED_COUNT = COUNT1 * COUNT2 * COUNT3;

  const PARAMS = {
    a: new NumberRange(1, COUNT1),
    b: new NumberRange(1, COUNT2),
    c: new NumberRange(1, COUNT3)
  };

  const pc = new ParameterCollection(PARAMS);

  let total = 0;
  for (let val of pc.getUnits()) {
    //console.log(`${total} ::`, val);
    total++;
  }

  t.is(total, EXPECTED_COUNT);
});