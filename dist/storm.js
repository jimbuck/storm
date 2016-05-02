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
var base_1 = require('./logic/synthesizers/base');
exports.BaseSynthesizer = base_1.BaseSynthesizer;
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
            tournamentSize: Math.max(4, Math.floor(this.generationSize * 0.2))
        });
        this.synthesizer = new standard_1.default({
            generationSize: this.generationSize,
            params: this.params,
            clone: options.clone
        });
        if (typeof options.cross !== 'undefined') {
            this.synthesizer.cross = options.cross;
        }
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
                currentGen = this.synthesizer.breed(prevGen);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3Rvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUEseUJBQXNELGdCQUFnQixDQUFDLENBQUE7QUFDdkUsdUJBQWdDLGNBQWMsQ0FBQyxDQUFBO0FBRS9DLHVCQUFpQixjQUFjLENBQUMsQ0FBQTtBQUdoQyw2QkFBdUIsOEJBQThCLENBQUMsQ0FBQTtBQUd0RCwyQkFBZ0MsK0JBQStCLENBQUMsQ0FBQTtBQUVoRSxNQUFNLFFBQVEsR0FBRyxDQUFDLEtBQVUsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQyxDQUFDO0FBRWxELElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztBQUVoQixtQ0FBbUM7QUFDbkMscUJBQXFFLGNBQWMsQ0FBQztBQUE1RSw2Q0FBYTtBQUFFLDZDQUFhO0FBQUUseUNBQVc7QUFBRSx5Q0FBaUM7QUFDcEYsdUJBQXNELGdCQUFnQixDQUFDO0FBQW5DLDJDQUFtQztBQUV2RSxxQkFBNEMsMkJBQTJCLENBQUM7QUFBaEUsaURBQWdFO0FBT3hFOztHQUVHO0FBQ0gsWUFBa0IsbUJBQW1COztJQWVuQzs7O09BR0c7SUFDSCxZQUFZLE9BQXFCO1FBRS9CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxPQUFPLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENB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