import { ArgumentGenerator } from '../../utils/data';
import BaseSynthesizer from './base';
export default class StandardSynthesizer extends BaseSynthesizer {
    /**
     * Creates a standard synthesizer, randomly mixing parents with a small chance of mutation.
     */
    constructor(options: {
        generationSize: number;
        params: ArgumentGenerator;
    });
    breed(gen: any[]): any[];
}
