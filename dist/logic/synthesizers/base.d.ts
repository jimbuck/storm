import { IDynamicParams } from '../../utils/data';
declare abstract class BaseSynthesizer {
    abstract breed(gen: IDynamicParams[]): IDynamicParams[];
    abstract mutate(dna: IDynamicParams): IDynamicParams;
}
export default BaseSynthesizer;
