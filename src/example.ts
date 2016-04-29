
/**
 * debug.js - This is a simple script that is used for debugging purposes only.
 */

import {Storm, RandomFloat} from './storm';

// The equation we are trying to optimize!
const quadratic = function (x:number, y:number) {
  return -2*Math.pow(y, 2) + 3*Math.pow(x, 2) + 8*x*y + -6*x + 4*y + 2;
};

let storm = new Storm({
  params: {
    x: new RandomFloat(-100, 100),  // [1, 2, ..., 20]
    y: new RandomFloat(-100, 100) // [-10, -9, ..., 9, 10]
  },
  generationSize: 100, // Work with 10 solutions at a time.
  done: 5000, // limit to 10 generations (may also be a function)
  run: (data: any) => {
    // Just pass the parameters to the module to test.
    return quadratic(data.x, data.y);
  },
  score: function (record) {
    // Invert the absolute results (closer to zero is the goal)
    return 1 / Math.abs(record.result);
  }
});

let startTime = Date.now();

storm
  .start()
  .then(results => {
    let duration = Date.now() - startTime;
    console.log('Min:', results.min);
    console.log('Max:', results.max);
    console.log(`(${results.totalGenerations} generations in ${Math.floor(duration / 100) / 10}s)`);
  });