import test from 'ava';

import {RandomInteger} from '../../utils/data';
import StandardSynthesizer from './standard';

test('return an empty array if no previous generation', t => {
  let synth = new StandardSynthesizer({
    generationSize: 3,
    params: {
      a: new RandomInteger(-10, 10)
    }
  });

  let nextGen = synth.breed([]);
  t.is(nextGen.length, 0);
});