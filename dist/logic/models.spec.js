import test from 'ava';
import {StormResult} from './models';

test(`StormResult props should have default values`, t => {
  let sr = new StormResult();
  
  t.is(sr.all.length, 0);
  t.is(sr.totalGenerations, 0);
  t.is(sr.totalScore, 0);
  t.is(sr.min.score, Number.MAX_VALUE);
  t.is(sr.max.score, Number.MIN_VALUE);
});

test(`StormResult 'avg' should return zero if no players`, t => {
  let sr = new StormResult();

  t.is(sr.avg, 0);
});

test(`StormResult 'avg' should be calculated`, t => {
  const TOTAL_SCORE = 300;
  const TOTAL_PLAYERS = 30;
  const EXPECTED_AVERAGE = TOTAL_SCORE / TOTAL_PLAYERS;

  let sr = new StormResult();
  sr.totalScore = TOTAL_SCORE;
  sr.all = new Array(TOTAL_PLAYERS);
  
  t.is(sr.avg, EXPECTED_AVERAGE);
});