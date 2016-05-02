import { IStormConfig, IStormRecord, StormResult } from './logic/models';
import { ArgumentGenerator } from './utils/data';
import { ISelector } from './logic/selectors/base';
import { ISynthesizer } from './logic/synthesizers/base';
export { OrderedNumber, RandomInteger, RandomFloat, OrderedItem } from './utils/data';
export { IStormConfig, IStormRecord, StormResult } from './logic/models';
export { ISelector } from './logic/selectors/base';
export { BaseSynthesizer, ISynthesizer } from './logic/synthesizers/base';
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
    selector: ISelector;
    synthesizer: ISynthesizer<any>;
    /**
     * Creates a new Storm instance ready for execution.
     * @param {IStormConfig} options - An object hash containing configuration settings.
     */
    constructor(options: IStormConfig);
    start(): Promise<StormResult>;
    /**
     * Steps one generation forward, adding the data to this.results.
     */
    step(prevGen?: IStormRecord[], currentGeneration?: number): Promise<IStormRecord[]>;
}
