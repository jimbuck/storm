"use strict";
const array_1 = require('../../utils/array');
const base_1 = require('./base');
class StandardSynthesizer extends base_1.BaseSynthesizer {
    /**
     * Creates a standard synthesizer, randomly mixing parents with a small chance of mutation.
     */
    constructor(opts) {
        super(opts);
        this.mutationRate = opts.mutationRate || 0.1;
    }
    cross(parentA, parentB) {
        let child = {};
        let props = Object.keys(parentA.params);
        props.forEach(prop => {
            child[prop] = (Math.random() > 0.5) ? parentA.params[prop] : parentB.params[prop];
            if (Math.random() < this.mutationRate) {
                let randomProp = array_1.random(props);
                child[randomProp] = this.params.nextValue()[randomProp];
            }
        });
        return child;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StandardSynthesizer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbmRhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbG9naWMvc3ludGhlc2l6ZXJzL3N0YW5kYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSx3QkFBb0MsbUJBQW1CLENBQUMsQ0FBQTtBQUN4RCx1QkFBOEIsUUFBUSxDQUFDLENBQUE7QUFFdkMsa0NBQW9ELHNCQUFlO0lBSWpFOztPQUVHO0lBQ0gsWUFBWSxJQUtYO1FBQ0MsTUFBTSxJQUFJLENBQUMsQ0FBQztRQUVaLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxHQUFHLENBQUM7SUFDL0MsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFxQixFQUFFLE9BQW9CO1FBQ3RELElBQUksS0FBSyxHQUFRLEVBQUUsQ0FBQztRQUNwQixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4QyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUk7WUFDaEIsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVsRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksVUFBVSxHQUFHLGNBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUQsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7QUFDSCxDQUFDO0FBakNEO3FDQWlDQyxDQUFBIn0=