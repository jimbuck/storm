
import {IStormRecord} from '../models';
import {ArgumentGenerator} from '../../utils/data';

abstract class BaseSynthesizer
{
  protected generationSize: number;
  protected params: ArgumentGenerator;

  /**
   * Initializes the generationSize and params properties.
   */
  constructor(options: {
    generationSize: number,
    params: ArgumentGenerator
  }) {
    this.generationSize = options.generationSize;
    this.params = options.params;
  }

  abstract breed(gen: {}[]): {}[];
}

export default BaseSynthesizer;