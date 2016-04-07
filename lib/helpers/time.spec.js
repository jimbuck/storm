import test from 'ava';
import time from './time';

test('current should return a float', t => {
  const timeNow = time.current;

  t.not(timeNow % 1, 0); // check for float  
});

test.cb('current should return the current millisecond time', t => {
  const DELAY = 343;
  const THRESHOLD = 15; // Arbitrary value, 15ms window...
  const timeStart = time.current;
  const dateStart = Date.now();

  setTimeout(() => {
    const timeStop = time.current;
    const dateStop = Date.now();

    const dateDiff = dateStop - dateStart;
    const timeDiff = timeStop - timeStart;

    let dateError = Math.abs(timeDiff - dateDiff);
    
    //console.log('Date: ', dateError);

    t.true(dateError < THRESHOLD);
    t.end();
  }, DELAY);
});