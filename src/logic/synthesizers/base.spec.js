import test from 'ava';
import {BaseSynthesizer} from './base';
import {RandomInteger} from '../../utils/data';
import {randomStormResult} from '../../test-data';

test.beforeEach(t => {
  t.context.bs = new BaseSynthesizer({
    generationSize: 2,
    clone: 2,
    params: {
      a: new RandomInteger(-10, 10)
    }
  });
});

test('BaseSynthesizer should return an empty array if no previous generation', t => {
  let nextGen = t.context.bs.breed([]);
  t.is(nextGen.length, 0);
});

test('BaseSynthesizer should clone specified children over', t => {
  let prevGen = [
    randomStormResult(2),
    randomStormResult(3),
    randomStormResult(4),
    randomStormResult(1),
  ];
  let nextGen = t.context.bs.breed(prevGen);
  
  
  t.is(nextGen[0], prevGen[2].params);
  t.is(nextGen[1], prevGen[1].params);
});