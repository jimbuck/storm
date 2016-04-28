"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const stream_1 = require('stream');
const models_1 = require('./logic/models');
const data_1 = require('./utils/data');
const time_1 = require('./utils/time');
const tournament_1 = require('./logic/selectors/tournament');
const identity = (thing) => { return thing; };
let trialId = 0;
// Expose these helper classes.
var data_2 = require('./utils/data');
exports.OrderedNumber = data_2.OrderedNumber;
exports.RandomInteger = data_2.RandomInteger;
exports.RandomFloat = data_2.RandomFloat;
exports.OrderedItem = data_2.OrderedItem;
/**
 * An advanced optimization library.
 */
class Storm extends stream_1.Readable {
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
        super({ objectMode: true });
        this.params = new data_1.ArgumentGenerator(options.params);
        this.isStream = false;
        this.isPromise = false;
        if (typeof options.done === 'number') {
            let doneNum = options.done;
            this.done = (gen, result) => {
                return gen >= doneNum;
            };
        }
        else {
            this.done = options.done;
        }
        this.selector = options.selector || new tournament_1.default({
            tournamentSize: Math.max(5, Math.floor(this.generationSize * 0.2))
        });
    }
    _read() {
        if (this.isPromise) {
            throw new Error(`'Once 'start' is called you cannot stream!`);
        }
        this.isStream = true;
        this.step().then((generation) => {
            if (generation) {
                generation.forEach(result => this.push(result));
            }
            else {
                this.push(null);
            }
        });
    }
    start() {
        if (this.isStream) {
            throw new Error(`'Once 'pipe' is called you cannot use promises!`);
        }
        this.isPromise = true;
        this.results = new models_1.StormResult();
        return this._stepUntilDone();
    }
    _stepUntilDone() {
        return __awaiter(this, void 0, Promise, function* () {
            let generation = yield this.step();
            this.results.add(generation);
            if (this.done(this.currentIteration, this.results)) {
                return this.results;
            }
            else {
                return yield this._stepUntilDone();
            }
        });
    }
    /**
     * Steps one generation forward, adding the data to this.results.
     */
    step() {
        return __awaiter(this, void 0, Promise, function* () {
            let generation = [];
            for (let i = 0; i < this.generationSize; i++) {
                let id = trialId++;
                //console.log(`Starting task ${id}...`);
                let unit = this.params.nextValue();
                // Stop when all units have been processed...    
                if (typeof unit === 'undefined') {
                    return null;
                }
                let startTime = time_1.default.current;
                let record;
                try {
                    let result = yield this.run.call(unit, unit);
                    let timeDiff = time_1.default.current - startTime;
                    record = {
                        id: id,
                        iteration: this.currentIteration,
                        success: true,
                        time: timeDiff,
                        params: unit,
                        result: result,
                        score: 0
                    };
                    record.score = this.score(record) || 0;
                }
                catch (ex) {
                    let timeDiff = time_1.default.current - startTime;
                    record = {
                        id: id,
                        iteration: this.currentIteration,
                        success: false,
                        time: timeDiff,
                        params: unit,
                        result: ex,
                        score: null // Should this be zero? -1?
                    };
                }
                generation.push(record);
            }
            return generation;
        });
    }
}
exports.Storm = Storm;
//# sourceMappingURL=storm.js.map