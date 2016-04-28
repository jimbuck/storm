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
        x: new storm_1.RandomInteger(1, 20),
        y: new storm_1.RandomInteger(-10, 10) // [-10, -8, ..., 20]
    },
    generationSize: 10,
    done: 10,
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
//# sourceMappingURL=debug.js.map