#Storm
Because thinking is hard.

[![Build Status](https://travis-ci.org/JimmyBoh/storm.svg?branch=master)](https://travis-ci.org/JimmyBoh/storm)
[![Coverage Status](https://coveralls.io/repos/github/JimmyBoh/storm/badge.svg?branch=master)](https://coveralls.io/github/JimmyBoh/storm?branch=master)
[![NPM Dependencies](https://david-dm.org/JimmyBoh/storm.svg)](https://david-dm.org/JimmyBoh/storm)

Problem solving is not easy. Whether it is building a thorough dataset for brute force approaches or managing a huge number of asynchronous actions, most of your time is spent **preparing** to solve the problem instead of just solving it.
But don't worry! Fortunately for you computers are _very_ good at math.
And better methods for finding optimal solutions are all around us (and with far better results).

Storm is built around solving complex problems through simple genetic algorithms.
Define the parameter settings, specify a scoring method and let Storm run it's course to crunch all that data.
When it's over, you'll get a report that includes total tests run, timing data, best and worst results, and more.


## Example:

```js
import {Storm, RandomInteger} from 'storm';

// The equation we are trying to optimize!
const quadratic = function (x, y) {
  return -2*Math.pow(y, 2) + 3*Math.pow(x, 2) + 8*x*y + -6*x + 4*y + 2;
};

let storm = new Storm({
  params: {
    x: new RandomInteger(1, 20),     // [1,2, ..., 20]
    y: new RandomInteger(-10, 10) // [-10, -8, ..., 20]
  },
  generationSize: 10, // Work with 10 solutions at a time.
  limit: 10, // limit to 10 generations (may also be a function)
  run: (params) => {
    // Just pass the parameters to the module to test.
    return quadratic(params.x, params.y);
  },
  score: function (result) {
    // Invert the absolute results (closer to zero is the goal)
    return 1 / Math.abs(result);
  }
});

storm
  .start()
  .then(results => {
    console.log('Min:', results.min);
    console.log('Max:', results.max);
    console.log('All:', results.all);
  });
```


## Features:
 - Simple yet flexible API
 - Built around async operations (via Promises)
 - Stream enabled (perfect for massive data-sets)
 - Built-in data tools for defining characteristics about the parameters
 - Automatically handles crossover and mutation (but can be overridden)
 
## Contribute
 
 0. Fork it
 1. `npm i -g ava typescript gulp`
 2. `npm i`
 4. `gulp watch`
 5. Make changes and **write tests**.
 6. Send pull request! :sunglasses:
 
## License:
 
MIT