
import test from 'ava';

import {IRecord, IScorable} from '../models';
import {BaseSelector} from './base';  

test.beforeEach(t => {
  t.context.bs = new BaseSelector();
});

test(`BaseSelector 'compare' requires at least one result`, t => {
  t.throws(() => {
    t.context.bs.compare(null, null);
  }, `Must pass at least one result!`);
});

test(`BaseSelector 'compare' returns the defined result if the other is undefined.`, t => {
  const PLAYER_A = {
    score: 3
  };
  let PLAYER_B = {
    score: 7
  };

  let resultA = t.context.bs.compare(PLAYER_A, null);
  let resultB = t.context.bs.compare(null, PLAYER_B);
  
  t.is(resultA, PLAYER_A);
  t.is(resultB, PLAYER_B);
});

test(`BaseSelector 'compare' returns the defined result if the other score is undefined.`, t => {
  const PLAYER_A = {score: 3};
  const PLAYER_B = { score: null };

  let result = t.context.bs.compare(PLAYER_A, PLAYER_B);

  t.is(result, PLAYER_A);
});

test(`BaseSelector 'compare' returns the higher of two scored players`, t => {
  const PLAYER_A = {score: 3};
  const PLAYER_B = {score: 8};

  let result = t.context.bs.compare(PLAYER_A, PLAYER_B);

  t.is(result, PLAYER_B);
});

test(`BaseSelector 'compare' returns the faster of two same-scored players`, t => {
  const PLAYER_A = { score: 3, time: 42 };
  const PLAYER_B = { score: 3, time: 2 };

  let result = t.context.bs.compare(PLAYER_A, PLAYER_B);

  t.is(result, PLAYER_B);
});

test(`BaseSelector 'compare' returns the first of same score and timed players`, t => {
  const PLAYER_A = { score: 3, time: 2 };
  const PLAYER_B = { score: 3, time: 2 };

  let result = t.context.bs.compare(PLAYER_A, PLAYER_B);

  t.is(result, PLAYER_A);
});