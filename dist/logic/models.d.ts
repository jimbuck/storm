import BaseSelector from './selectors/base';
import BaseSynthesizer from './synthesizers/base';
/**
 * Configuration Settings for a standard Storm instance.
 */
export interface IStormConfig {
    /**
     * The is the data object that will be modified and provided during trials.
     */
    params: any;
    /**
     * The maxium number of generations, or a function which returns a boolean indicating when complete.
     * When it is a function two parameters are recieved: generation number and current results (min, max, all, etc.).
     */
    done: ((i: number, current: StormResult) => boolean) | number;
    /**
     * The maximum size of each generation.
     */
    generationSize: number;
    /**
     * Used to execute target code by mapping supplied parameters to the correct usage.
     * @param {TInput} params - The dynamic data set created randomly or via breeding/mutation.
     */
    run: (params: any) => any | PromiseLike<any>;
    /**
     * An optional transform function to convert a result into a numerical score.
     * @param {IStormRecord} record - The current record, including runtime duration, initial parameters, and result data.
     */
    score?: (record: IStormRecord) => number;
    /**
     * Optional object for handling the selection of the best canidates from each generation.
     */
    selector?: BaseSelector;
    /**
     * Optional object for handling the crossover and mutation of canidates in a generation.
     */
    synthesizer?: BaseSynthesizer;
}
/**
 * An unabridged collection of records with aggregated data used at the end of each generation.
 */
export declare class StormResult {
    /**
     * The sum of all of the scores across all generations (used to find averages).
     */
    private totalScore;
    /**
     * The total number of generations.
     */
    totalGenerations: number;
    /**
     * The average score across all generations.
     */
    avg: number;
    /**
     * The lowest scored record across all generations.
     */
    min: IStormRecord;
    /**
     * The highest scored record across all generations.
     */
    max: IStormRecord;
    /**
     * All records across all generations.
     */
    all: IStormRecord[];
    /**
     * Creates a new StormResult to house the generation and lifetime data.
     */
    constructor();
    /**
     * Adds a new generation to the result instance.
     */
    add(results: IStormRecord[]): void;
}
/**
 * A single unit representing a completed run.
 */
export interface IStormRecord {
    /**
     * The unique identifier for the record.
     */
    id: number;
    /**
     * The generation number of the record.
     */
    generation: number;
    /**
     * The score this record has revieved. If the trial failed, the score will be zero.
     */
    score: number;
    /**
     * Flag to determine if the trial was succesful.
     */
    success: boolean;
    /**
     * The dynamic dataset that was provided in this trial.
     */
    params: any;
    /**
     * The calculated result of the run function.
     */
    result: any;
    /**
     * The number of milliseconds it took for this trial to execute.
     */
    time: number;
}
