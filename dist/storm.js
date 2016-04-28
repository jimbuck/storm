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
        this.currentGeneration = 0;
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
            this.currentGeneration = 0;
            let result = new models_1.StormResult();
            result.add(yield this.step());
            while (!this.done(this.currentGeneration++, result)) {
                result.add(yield this.step(result.gen));
            }
            return result;
        });
    }
    /**
     * Steps one generation forward, adding the data to this.results.
     */
    step(prevGen) {
        return __awaiter(this, void 0, Promise, function* () {
            let currentGen;
            if (prevGen) {
                currentGen = this.params.nextValues(this.generationSize); //this.mutator.next(prevGen);
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
                        generation: this.currentGeneration,
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
                        generation: this.currentGeneration,
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
//# sourceMappingURL=storm.js.map