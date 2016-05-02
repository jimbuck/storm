
/**
 * debug.js - This is a simple script that is used for debugging purposes only.
 */

import {Storm, RandomFloat, IStormRecord, ISynthesizer, BaseSynthesizer} from './storm';
import {sort, shuffle, random} from './utils/array';

const sparkly = require('sparkly');

// The equation we are trying to optimize!
const quadratic = function (x:number, y:number, z: number) {
  return -2*Math.pow(y+z, 2) + 3*Math.pow(x*z, 2) + 8*x*y*z + -6*x - 8*z + 4*y + 2 + Math.pow(Math.abs(z), 0.5);
};

let storm = new Storm({
  params: {
    x: new RandomFloat(-1000, 1000),  // [1, 2, ..., 20]
    y: new RandomFloat(-1000, 1000), // [-10, -9, ..., 9, 10]
    z: new RandomFloat(-1000, 1000)
  },
  generationSize: 40, // Work with 10 solutions at a time.
  clone: 10,
  done: 4000, // limit to 10 generations (may also be a function)
  run: (data: any) => {
    // Just pass the parameters to the module to test.
    return quadratic(data.x, data.y, data.z);
  },
  score: function (record) {
    if (record.result === 0) {
      return 0;
    }

    // Invert the absolute results (closer to zero is the goal)
    return 1 / Math.abs(record.result);
  }
});

let startTime = Date.now();

console.log('Starting new simulation...');

storm
  .start()
  .then(results => {
    let duration = Date.now() - startTime;
    let maxChart: number[] = [];
    let avgChart: number[] = [];

    let i = 1;
    let check = results.totalGenerations / 40;    
    results.generations.filter(g => i++ % check === 0).forEach(g => {
      //console.log(`Gen ${g.id}: Max=${g.max.score}, Avg=${g.avg}`);
      maxChart.push(g.max.score);
      avgChart.push(g.avg);
    });
    
    console.log('Max: ' + sparkly(maxChart));
    console.log('Max:', results.max);

    console.log('');    
        
    console.log('Avg: ' + sparkly(avgChart));
    console.log(`(${results.totalGenerations} generations in ${Math.floor(duration / 100) / 10}s)`);
  });