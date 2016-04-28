import { Readable } from 'stream';
import { IStormConfig, StormResult } from './logic/models';
import { ArgumentGenerator } from './utils/data';
import BaseSelector from './logic/selectors/base';
export { OrderedNumber, RandomInteger, RandomFloat, OrderedItem } from './utils/data';
export interface DoneFunction {
    (gen: number, current: StormResult): boolean;
}
/**
 * An advanced optimization library.
 */
export declare class Storm extends Readable {
    params: ArgumentGenerator;
    done: DoneFunction;
    private isStream;
    private isPromise;
    run: (params: any) => PromiseLike<any>;
    score: (data: any) => number;
    generationSize: number;
    private currentIteration;
    private results;
    selector: BaseSelector;
    /**
     * Creates a new Storm instance ready for execution.
     * @param {IStormConfig} options - An object hash containing configuration settings.
     */
    constructor(options: IStormConfig);
    _read(): void;
    start(): PromiseLike<StormResult>;
    private _stepUntilDone();
    /**
     * Steps one generation forward, adding the data to this.results.
     */
    private step();
}
