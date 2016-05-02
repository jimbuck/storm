"use strict";
const base_1 = require('./base');
class Top extends base_1.BaseSelector {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xvZ2ljL3NlbGVjdG9ycy90b3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLHVCQUEyQixRQUFRLENBQUMsQ0FBQTtBQUVwQyxrQkFBaUMsbUJBQVk7SUFFM0M7UUFDRSxPQUFPLENBQUM7SUFDVixDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQW1CLEVBQUUsS0FBYTtRQUN2QyxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFMUIsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztBQUNILENBQUM7QUFmRDtxQkFlQyxDQUFBIn0=