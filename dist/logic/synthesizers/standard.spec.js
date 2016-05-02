import test from 'ava';

import {randomStormResult} from '../../test-data';
import {OrderedItem, ArgumentGenerator} from '../../utils/data';
import StandardSynthesizer from './standard';


test.beforeEach(t => {
  t.context.ss = new StandardSynthesizer({
    generationSize: 8,
    clone: 2,
    params: new ArgumentGenerator({
      prop1: new OrderedItem(['a', 'b']),
      prop2: new OrderedItem(['a', 'b']),
      prop3: new OrderedItem(['a', 'b'])
    }),
    mutationRate: -1
  });
});

test(`StandardSynthesizer 'cross' should mix stats from two parents`, t => {
  let parentA = randomStormResult(2, {
    prop1: 'a',
    prop2: 'a',
    prop3: 'a'
  });

  let parentB = randomStormResult(4, {
    prop1: 'b',
    prop2: 'b',
    prop3: 'b'
  });

  let child = t.context.ss.cross(parentA, parentB);
  const PROPS = Object.keys(child);

  PROPS.forEach(prop => {
    t.true(parentA.params.hasOwnProperty(prop) && parentB.params.hasOwnProperty(prop));
    t.true(child[prop] === parentA.params[prop] || child[prop] === parentB.params[prop]);
  });
});