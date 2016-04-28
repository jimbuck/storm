/**
 * debug.js - This is a simple script that is used for debugging purposes only.
 */
"use strict";
const storm_1 = require('./storm');
// The equation we are trying to optimize!
const quadratic = function (x, y) {
    return -2 * Math.pow(y, 2) + 3 * Math.pow(x, 2) + 8 * x * y + -6 * x + 4 * y + 2;
};
let storm = new storm_1.Storm({
    params: {
        x: new storm_1.RandomFloat(-10, 10),
        y: new storm_1.RandomFloat(-10, 10) // [-10, -9, ..., 9, 10]
    },
    generationSize: 50,
    done: 2000,
    run: (data) => {
        // Just pass the parameters to the module to test.
        return Promise.resolve(quadratic(data.x, data.y));
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
    console.log(`Avg: ${results.avg} (${results.totalGenerations} generations in ${Math.floor(duration / 100) / 10}s)`);
    //console.log('All:', results.all);
});
//# sourceMappingURL=debug.js.map