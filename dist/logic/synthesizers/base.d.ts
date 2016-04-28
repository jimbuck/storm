import { ArgumentGenerator } from '../../utils/data';
declare abstract class BaseSynthesizer {
    protected generationSize: number;
    protected params: ArgumentGenerator;
    /**
     * Initializes the generationSize and params properties.
     */
    constructor(options: {
        generationSize: number;
        params: ArgumentGenerator;
    });
    abstract breed(gen: {}[]): {}[];
}
export default BaseSynthesizer;
