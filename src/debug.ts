
/**
 * debug.js - This is a simple script that is used for debugging purposes only.
 */

import {Storm, RandomInteger} from './storm';

// The equation we are trying to optimize!
const quadratic = function (x:number, y:number) {
  return -2*Math.pow(y, 2) + 3*Math.pow(x, 2) + 8*x*y + -6*x + 4*y + 2;
};

let storm = new Storm({
  params: {
    x: new RandomInteger(1, 20),     // [1,2, ..., 20]
    y: new RandomInteger(-10, 10) // [-10, -8, ..., 20]
  },
  generationSize: 10, // Work with 10 solutions at a time.
  done: 10, // limit to 10 generations (may also be a function)
  run: (params) => {
    // Just pass the parameters to the module to test.
    return quadratic(params.x, params.y);
  },
  score: function (record) {
    // Invert the absolute results (closer to zero is the goal)
    return 1 / Math.abs(record.result);
  }
});

storm
  .start()
  .then(results => {
    console.log('Min:', results.min);
    console.log('Max:', results.max);
    console.log('All:', results.all);
  });