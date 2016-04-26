'use strict';


/**
 * debug.js - This is a simple script that is used for debugging purposes only.
 */

const toArray = require('stream-to-array');

const Storm = require('./');


const EXPECTED_RESULT_COUNT = 18; // Derived from params below...
let storm = new Storm({
  iterations: 3,
  params: {
    a: Storm.numberRange(1, 2),   // [1,2]
    b: Storm.numberRange(7, 1),   // [7]
    c: Storm.numberRange(0, 3, 2) // [0,2,4]
  },
  run: (params) => {

    //if (Math.random() > 0.6) throw new Error('Bad run!!!');

    return (2 * Math.pow(params.a, 2)) + (3 * params.b) + params.c; // Returns some result...
  },
  score: function(result) {
    //if (Math.random() > 0.6) throw new Error('Bad score!!!');

    return Math.log(result); // Convert results into scores (if not already numerical)
  }
});

let results = [];

storm.on('data', result => {
  results.push(result);
}).on('end', () => {
  console.log();
}).on('error', err => {
  console.log();
});

// toArray(storm).then(results => {
//   console.log(`results is array: ${results instanceof Array}`);
//   console.log(`result count: ${results.length} (${EXPECTED_RESULT_COUNT})`);
// });