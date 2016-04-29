"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const models_1 = require('./logic/models');
const data_1 = require('./utils/data');
const time_1 = require('./utils/time');
const tournament_1 = require('./logic/selectors/tournament');
const standard_1 = require('./logic/synthesizers/standard');
const identity = (thing) => { return thing; };
let trialId = 0;
// Expose helper classes and types.
var data_2 = require('./utils/data');
exports.OrderedNumber = data_2.OrderedNumber;
exports.RandomInteger = data_2.RandomInteger;
exports.RandomFloat = data_2.RandomFloat;
exports.OrderedItem = data_2.OrderedItem;
var models_2 = require('./logic/models');
exports.StormResult = models_2.StormResult;
/**
 * An advanced optimization library.
 */
class Storm // extends Readable
 {
    /**
     * Creates a new Storm instance ready for execution.
     * @param {IStormConfig} options - An object hash containing configuration settings.
     */
    constructor(options) {
        if (typeof options === 'undefined') {
            throw new Error(`Options must be specified!`);
        }
        if (typeof options.params === 'undefined') {
            throw new Error(`'params' must be specified!`);
        }
        if (typeof options.done !== 'number' && typeof options.done !== 'function') {
            throw new Error(`'done' must be specified!`);
        }
        if (typeof options.generationSize === 'undefined') {
            throw new Error(`'generationSize' must be specified!`);
        }
        if (typeof options.run !== 'function') {
            throw new Error(`'run' must be specified!`);
        }
        //super({ objectMode: true });
        this.generationSize = options.generationSize;
        this.params = new data_1.ArgumentGenerator(options.params);
        this.isStream = false;
        this.isPromise = false;
        if (typeof options.done === 'number') {
            let doneNum = options.done - 1;
            this.done = (gen, result) => {
                return gen >= doneNum;
            };
        }
        else {
            this.done = options.done;
        }
        this.run = options.run;
        this.score = options.score;
        this.selector = options.selector || new tournament_1.default({
            tournamentSize: Math.max(5, Math.floor(this.generationSize * 0.2))
        });
        this.synthesizer = options.synthesizer || new standard_1.default({
            generationSize: this.generationSize,
            params: this.params
        });
    }
    // public _read() {
    //   if (this.isPromise) {
    //     throw new Error(`'Once 'start' is called you cannot stream!`);
    //   }
    //   this.isStream = true;
    //   this.step().then((generation: IStormRecord[]) => {
    //     if (generation) {
    //       generation.forEach(result => this.push(result));
    //     } else {
    //       this.push(null);
    //     }
    //   });  
    // }
    start() {
        return __awaiter(this, void 0, Promise, function* () {
            if (this.isStream) {
                throw new Error(`'Once 'pipe' is called you cannot use promises!`);
            }
            this.isPromise = true;
            let currentGeneration = 0;
            let result = new models_1.StormResult();
            let generation;
            do {
                // Update the generation...
                generation = yield this.step(generation, currentGeneration);
                // Add the results...
                result.add(generation);
            } while (!this.done(currentGeneration++, result));
            return result;
        });
    }
    /**
     * Steps one generation forward, adding the data to this.results.
     */
    step(prevGen, currentGeneration) {
        return __awaiter(this, void 0, Promise, function* () {
            let currentGen;
            if (prevGen) {
                currentGen = this.synthesizer.breed(prevGen.map(p => p.params));
            }
            else {
                currentGen = this.params.nextValues(this.generationSize);
            }
            let results = [];
            for (let i = 0; i < currentGen.length; i++) {
                let id = trialId++;
                let params = currentGen[i];
                let startTime = time_1.default.current;
                let record;
                try {
                    let result = yield this.run.call(params, params);
                    let timeDiff = time_1.default.current - startTime;
                    record = {
                        id: id,
                        generation: currentGeneration,
                        success: true,
                        time: timeDiff,
                        params: params,
                        result: result,
                        score: 0
                    };
                    record.score = this.score(record) || 0;
                }
                catch (ex) {
                    let timeDiff = time_1.default.current - startTime;
                    record = {
                        id: id,
                        generation: currentGeneration,
                        success: false,
                        time: timeDiff,
                        params: params,
                        result: ex,
                        score: 0
                    };
                }
                results.push(record);
            }
            return results;
        });
    }
}
exports.Storm // extends Readable
 = Storm // extends Readable
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3Rvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUEseUJBQXNELGdCQUFnQixDQUFDLENBQUE7QUFDdkUsdUJBQWdDLGNBQWMsQ0FBQyxDQUFBO0FBRS9DLHVCQUFpQixjQUFjLENBQUMsQ0FBQTtBQUdoQyw2QkFBdUIsOEJBQThCLENBQUMsQ0FBQTtBQUd0RCwyQkFBZ0MsK0JBQStCLENBQUMsQ0FBQTtBQUVoRSxNQUFNLFFBQVEsR0FBRyxDQUFDLEtBQVUsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQyxDQUFDO0FBRWxELElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztBQUVoQixtQ0FBbUM7QUFDbkMscUJBQXFFLGNBQWMsQ0FBQztBQUE1RSw2Q0FBYTtBQUFFLDZDQUFhO0FBQUUseUNBQVc7QUFBRSx5Q0FBaUM7QUFDcEYsdUJBQXNELGdCQUFnQixDQUFDO0FBQW5DLDJDQUFtQztBQU92RTs7R0FFRztBQUNILFlBQWtCLG1CQUFtQjs7SUFlbkM7OztPQUdHO0lBQ0gsWUFBWSxPQUFxQjtRQUUvQixFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLENBQUMsTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzNFLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENB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