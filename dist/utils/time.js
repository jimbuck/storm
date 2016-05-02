"use strict";
class Time {
    static get current() {
        let hrtime = process.hrtime();
        return (hrtime[0] * 1000000 + hrtime[1] / 1000) / 1000;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Time;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy90aW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtJQUVFLFdBQVcsT0FBTztRQUNoQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDN0IsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3pELENBQUM7QUFDSCxDQUFDO0FBTkQ7c0JBTUMsQ0FBQSJ9