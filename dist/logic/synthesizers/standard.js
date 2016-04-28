"use strict";
const array_1 = require('../../utils/array');
const base_1 = require('./base');
class StandardSynthesizer extends base_1.default {
    /**
     * Creates a standard synthesizer, randomly mixing parents with a small chance of mutation.
     */
    constructor(options) {
        super(options);
    }
    breed(gen) {
        if (gen.length === 0) {
            return [];
        }
        let nextGen = [];
        let props = Object.keys(gen[0]);
        while (nextGen.length < this.generationSize) {
            let pool = array_1.shuffle(gen.slice());
            let parentA = pool.pop();
            let parentB = pool.pop();
            let child = {};
            for (let prop in props) {
                child[prop] = (Math.random() > 0.5 ? parentA : parentB)[prop];
            }
            if (Math.random() < 0.25) {
                let randomProp = array_1.random(props);
                child[randomProp] = this.params.nextValue()[randomProp];
            }
            nextGen.push(child);
        }
        return nextGen;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StandardSynthesizer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbmRhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbG9naWMvc3ludGhlc2l6ZXJzL3N0YW5kYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSx3QkFBOEIsbUJBQW1CLENBQUMsQ0FBQTtBQUNsRCx1QkFBNEIsUUFBUSxDQUFDLENBQUE7QUFFckMsa0NBQWlELGNBQWU7SUFFOUQ7O09BRUc7SUFDSCxZQUFZLE9BR1g7UUFDQyxNQUFNLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxLQUFLLENBQUMsR0FBVTtRQUVyQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNaLENBQUM7UUFFRCxJQUFJLE9BQU8sR0FBUyxFQUFFLENBQUM7UUFFdkIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzVDLElBQUksSUFBSSxHQUFHLGVBQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUNoQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDekIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRXpCLElBQUksS0FBSyxHQUFRLEVBQUUsQ0FBQztZQUVwQixHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRSxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksVUFBVSxHQUFHLGNBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUQsQ0FBQztZQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEIsQ0FBQztRQUVELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakIsQ0FBQztBQUNILENBQUM7QUExQ0Q7cUNBMENDLENBQUEifQ==