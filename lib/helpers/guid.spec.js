import test from 'ava';
import guid from './guid';

const GUID_LENGTH = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.length;
const FOUR = '4';

function repeat(times, fn) {
  return function(t) {
    for (let i = 0; i < times; i++) {
      fn(t);
    }
  }
}

test('guid should return string', t => {
  t.is(typeof guid(), 'string');
});

test('guid should contain n characters', repeat(50, t => {
  t.is(guid().length, GUID_LENGTH);
}));

test('guid should have a 4 as the 14 character', repeat(50, t => {
  t.is(guid()[14], FOUR);
}));

let guids = new Set();
test('guid should not produce duplicates', repeat(1000, t => {
  let g = guid();
  let dup = guids.has(g); 
  guids.add(g);

  t.false(dup);
}));