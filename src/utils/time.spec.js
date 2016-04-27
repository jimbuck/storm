import test from 'ava';
import Time from './time';

test(`Time 'current' should return a float`, t => {
  const timeNow = Time.current;

  t.not(timeNow % 1, 0); // check for float  
});

test.cb(`Time 'current' should return the current millisecond time`, t => {
  const DELAY = 343;
  const THRESHOLD = 15; // Arbitrary value, 15ms window...
  const timeStart = Time.current;
  const dateStart = Date.now();

  setTimeout(() => {
    const timeStop = Time.current;
    const dateStop = Date.now();

    const dateDiff = dateStop - dateStart;
    const timeDiff = timeStop - timeStart;

    let dateError = Math.abs(timeDiff - dateDiff);
    
    //console.log('Date: ', dateError);

    t.true(dateError < THRESHOLD);
    t.end();
  }, DELAY);
});