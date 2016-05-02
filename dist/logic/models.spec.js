import test from 'ava';
import {StormResult} from './models';

test(`StormResult props should have default values`, t => {
  let sr = new StormResult();
  
  t.is(sr.totalCount, 0);
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
  sr.totalCount = TOTAL_PLAYERS;
  
  t.is(sr.avg, EXPECTED_AVERAGE);
});

test(`StormResult 'add' should update the totals for the generation`, t => {
  let sr = new StormResult();

  sr.add([
    { score: 4 },
    { score: 2 },
    { score: 5 },
    { score: 1 },
    { score: 3 },
    { score: 0 },
  ]);
  
  t.is(sr.totalCount, 6);
  t.is(sr.totalGenerations, 1);
  t.is(sr.totalScore, 15);
  t.is(sr.min.score, 0);
  t.is(sr.max.score, 5);
});

test(`StormResult 'add' should update the totals for the lifetime`, t => {
  let sr = new StormResult();

  sr.add([
    { score: 4 },
    { score: 2 },
    { score: 5 },
    { score: 1 },
    { score: 3 },
    { score: 0 },
  ]);

  
  sr.add([
    { score: 14 },
    { score: 12 },
    { score: 21 },
    { score: 11 },
    { score: -13 }
  ]);

  t.is(sr.totalCount, 11);
  t.is(sr.totalGenerations, 2);
  t.is(sr.totalScore, 60);
  t.is(sr.min.score, -13);
  t.is(sr.max.score, 21);
});