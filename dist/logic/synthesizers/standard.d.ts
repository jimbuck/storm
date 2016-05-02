import { ArgumentGenerator } from '../../utils/data';
import { IStormRecord } from '../models';
import { BaseSynthesizer } from './base';
export default class StandardSynthesizer<T> extends BaseSynthesizer<T> {
    mutationRate: number;
    /**
     * Creates a standard synthesizer, randomly mixing parents with a small chance of mutation.
     */
    constructor(opts: {
        generationSize: number;
        clone?: number;
        params: ArgumentGenerator;
        mutationRate?: number;
    });
    cross(parentA: IStormRecord, parentB: IStormRecord): T;
}
