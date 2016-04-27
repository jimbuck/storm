
import test from 'ava';

import {IRecord, IScorable} from '../models';
import BaseSelection from './base';

import {TestSelection} from '../../test-data';

test.beforeEach(t => {
  t.context.ts = new TestSelection();
});

test(`BaseSelection 'compare' requires at least one result`, t => {
  t.throws(() => {
    t.context.ts.runCompare(null, null);
  }, `Must pass at least one result!`);
});

test(`BaseSelection 'compare' returns the defined result if the other is undefined.`, t => {
  const PLAYER_A = {
    score: 3
  };
  let PLAYER_B;

  let result = t.context.ts.runCompare(PLAYER_A, PLAYER_B);

  t.is(result, PLAYER_A);
});

test(`BaseSelection 'compare' returns the defined result if the other score is undefined.`, t => {
  const PLAYER_A = {score: 3};
  const PLAYER_B = { score: null };

  let result = t.context.ts.runCompare(PLAYER_A, PLAYER_B);

  t.is(result, PLAYER_A);
});

test(`BaseSelection 'compare'  returns the higher of two scored players`, t => {
  const PLAYER_A = {score: 3};
  const PLAYER_B = {score: 8};

  let result = t.context.ts.runCompare(PLAYER_A, PLAYER_B);

  t.is(result, PLAYER_B);
});