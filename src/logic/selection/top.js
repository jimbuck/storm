"use strict";
const base_1 = require('./base');
class Top extends base_1.default {
    constructor() {
        super();
    }
    select(gen, count) {
        let players = gen.slice();
        players.sort(function (a, b) {
            return b.score - a.score;
        });
        return players.slice(0, count);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Top;
//# sourceMappingURL=top.js.map