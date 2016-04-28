import { IStormConfig, IStormRecord, StormResult } from './logic/models';
import { ArgumentGenerator } from './utils/data';
import BaseSelector from './logic/selectors/base';
export { OrderedNumber, RandomInteger, RandomFloat, OrderedItem } from './utils/data';
export { IStormConfig, IStormRecord, StormResult } from './logic/models';
export interface DoneFunction {
    (gen: number, current: StormResult): boolean;
}
/**
 * An advanced optimization library.
 */
export declare class Storm {
    params: ArgumentGenerator;
    done: DoneFunction;
    private isStream;
    private isPromise;
    run: (params: any) => PromiseLike<any>;
    score: (data: IStormRecord) => number;
    generationSize: number;
    private currentGeneration;
    private results;
    selector: BaseSelector;
    /**
     * Creates a new Storm instance ready for execution.
     * @param {IStormConfig} options - An object hash containing configuration settings.
     */
    constructor(options: IStormConfig);
    start(): Promise<StormResult>;
    /**
     * Steps one generation forward, adding the data to this.results.
     */
    step(prevGen?: IStormRecord[]): Promise<IStormRecord[]>;
}
