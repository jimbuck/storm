
import {IDataGenerator, ArgumentGenerator} from '../../utils/data';
import {IStormRecord} from '../models';
import {shuffle, random, sort} from '../../utils/array';
import {BaseSynthesizer} from './base';

export default class StandardSynthesizer<T> extends BaseSynthesizer<T>
{
  public mutationRate: number;

  /**
   * Creates a standard synthesizer, randomly mixing parents with a small chance of mutation.
   */
  constructor(opts: {
    generationSize: number,
    clone?: number,
    params: ArgumentGenerator,
    mutationRate?: number
  }) {
    super(opts);

    this.mutationRate = opts.mutationRate || 0.1;
  }

  public cross(parentA: IStormRecord, parentB:IStormRecord): T {
    let child: any = {};
    let props = Object.keys(parentA.params);

    props.forEach(prop => {
      child[prop] = (Math.random() > 0.5) ? parentA.params[prop] : parentB.params[prop];

      if (Math.random() < this.mutationRate) {
        let randomProp = random(props);
        child[randomProp] = this.params.nextValue()[randomProp];
      }
    });

    return child;
  }
}