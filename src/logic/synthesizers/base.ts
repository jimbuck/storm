
import {IStormRecord} from '../models';
import {IDynamicParams} from '../../utils/data';

abstract class BaseSynthesizer
{
  abstract breed(gen: IDynamicParams[]): IDynamicParams[];

  abstract mutate(dna: IDynamicParams): IDynamicParams;
}

export default BaseSynthesizer;