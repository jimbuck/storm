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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xvZ2ljL3NlbGVjdG9ycy90b3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLHVCQUEwQixRQUFRLENBQUMsQ0FBQTtBQUVuQyxrQkFBaUMsY0FBYTtJQUU1QztRQUNFLE9BQU8sQ0FBQztJQUNWLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBbUIsRUFBRSxLQUFhO1FBQ3ZDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUxQixPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDekIsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0FBQ0gsQ0FBQztBQWZEO3FCQWVDLENBQUEifQ==