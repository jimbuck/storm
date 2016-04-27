"use strict";
const base_1 = require('./logic/selection/base');
const data_1 = require('./utils/data');
exports.PLAYER_A = { score: 1 };
exports.PLAYER_B = { score: 2 };
exports.PLAYER_C = { score: 3 };
exports.PLAYER_D = { score: 5 };
exports.PLAYER_E = { score: 8 };
exports.PLAYER_F = { score: 13 };
exports.PLAYERS = [exports.PLAYER_D, exports.PLAYER_A, exports.PLAYER_F, exports.PLAYER_B, exports.PLAYER_E, exports.PLAYER_C];
class TestSelection extends base_1.default {
    constructor() {
        super();
    }
    select(gens, count) {
        return [];
    }
    runCompare(a, b) {
        return this.compare(a, b);
    }
}
exports.TestSelection = TestSelection;
class TestGenerator extends data_1.BaseGenerator {
    *getValues() {
        yield 1;
        yield 2;
        yield 3;
    }
    hasIterator() {
        return typeof this.iterator !== 'undefined';
    }
}
exports.TestGenerator = TestGenerator;
//# sourceMappingURL=test-data.js.map