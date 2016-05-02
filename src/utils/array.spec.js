import test from 'ava';
import {shuffle, sort, random} from './array';

// SORT ##################################################

test(`'sort' should sort asc by prop name`, t => {
  let input = [
    { rank: 2 },
    { rank: 3 },
    { rank: 1 },
  ];

  sort(input, 'rank');

  t.deepEqual(input.map(x => x.rank), [1, 2, 3]);
});

test(`'sort' should sort asc by prop name`, t => {
  let input = [
    { rank: 2 },
    { rank: 3 },
    { rank: 1 },
  ];

  sort(input, 'rank', true);

  t.deepEqual(input.map(x => x.rank), [3, 2, 1]);
});

// SHUFFLE ##################################################

test(`'shuffle' should scramble the contents`, t => {
  const LENGTH = 6;

  let input = [];
  let sortedOutput = '';
  let count = 0;
  
  for (let i = 0; i < LENGTH; i++){
    sortedOutput += '' + i;
    input.push(i);
  }

  const LIMIT = factorial(LENGTH);
  
  for (let i = 0; i < LIMIT; i++) {
    shuffle(input);

    count += (input.join('') === sortedOutput) ? 1 : 0;
  }

  //console.log(`COUNT: ${count}/${LIMIT}`);
  t.true((count / LIMIT) < 0.01);
});

function factorial(x) {
  return (x === 1) ? x : (x * factorial(x - 1));
}

// RANDOM ##################################################

test(`'random' should throw if no array`, t => {
  t.throws(
    () => random(),
    `'source' must have at least one element!`);
});

test(`'random' should throw if no elements`, t => {
  t.throws(
    () => random([]),
    `'source' must have at least one element!`);
});

test(`'random' should return a random element`, t => {
  let input = [];
  for (let i = 0; i < 1000; i++)input.push(i);

  let result1 = random(input);
  let result2 = random(input);

  t.is(typeof result1, 'number');
  t.is(typeof result2, 'number');
  t.not(result1, result2);
});