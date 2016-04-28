
import test from 'ava';

import {IRecord, IScorable} from '../models';
import BaseSelector from './base';

//import {TestSelector} from '../../test-data';

test.beforeEach(t => {
  t.context.ts = new BaseSelector();
});

test(`BaseSelector 'compare' requires at least one result`, t => {
  t.throws(() => {
    t.context.ts.compare(null, null);
  }, `Must pass at least one result!`);
});

test(`BaseSelector 'compare' returns the defined result if the other is undefined.`, t => {
  const PLAYER_A = {
    score: 3
  };
  let PLAYER_B;

  let result = t.context.ts.compare(PLAYER_A, PLAYER_B);

  t.is(result, PLAYER_A);
});

test(`BaseSelector 'compare' returns the defined result if the other score is undefined.`, t => {
  const PLAYER_A = {score: 3};
  const PLAYER_B = { score: null };

  let result = t.context.ts.compare(PLAYER_A, PLAYER_B);

  t.is(result, PLAYER_A);
});

test(`BaseSelector 'compare'  returns the higher of two scored players`, t => {
  const PLAYER_A = {score: 3};
  const PLAYER_B = {score: 8};

  let result = t.context.ts.compare(PLAYER_A, PLAYER_B);

  t.is(result, PLAYER_B);
});