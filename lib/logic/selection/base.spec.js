
import test from 'ava';

import BaseSelection from './base';

test(`optional 'options' for constructor`, t => {
  t.notThrows(() => {
    new BaseSelection();
  });
});

test(`requires 'gen' for 'select'`, t => {
  t.throws(() => {
    let bs = new BaseSelection();
    bs.select();
  }, `'gen' must be an array!`);
});

test(`requires 'count' for 'select'`, t => {
  t.throws(() => {
    let bs = new BaseSelection();
    bs.select([]);
  }, `'count' must be a positive number!`);
});