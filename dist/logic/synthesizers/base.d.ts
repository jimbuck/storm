import { IStormRecord } from '../models';
import { ArgumentGenerator } from '../../utils/data';
export interface ISynthesizer<T> {
    breed(gen: IStormRecord[]): T[];
    cross(parentA: IStormRecord, parentB: IStormRecord): T;
}
export declare abstract class BaseSynthesizer<T> implements ISynthesizer<T> {
    generationSize: number;
    clone: number;
    protected params: ArgumentGenerator;
    /**
     * Initializes the generationSize and params properties.
     */
    constructor(opts: {
        generationSize: number;
        clone?: number;
        params: ArgumentGenerator;
    });
    breed(gen: IStormRecord[]): T[];
    abstract cross(parentA: IStormRecord, parentB: IStormRecord): T;
}
