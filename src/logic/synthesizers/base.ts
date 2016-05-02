
import {IStormRecord} from '../models';
import {ArgumentGenerator} from '../../utils/data';
import {shuffle, random, sort} from '../../utils/array';

export interface ISynthesizer<T>
{
  breed(gen: IStormRecord[]): T[];

  cross(parentA: IStormRecord, parentB: IStormRecord): T;
}  

export abstract class BaseSynthesizer<T> implements ISynthesizer<T>
{
  public generationSize: number;
  public clone: number;
  protected params: ArgumentGenerator;

  /**
   * Initializes the generationSize and params properties.
   */
  constructor(opts: {
    generationSize: number,
    clone?: number,
    params: ArgumentGenerator
  }) {
    this.generationSize = opts.generationSize;
    this.clone = opts.clone || 0;
    this.params = opts.params;
  }

  public breed(gen: IStormRecord[]): T[] {
    if (gen.length === 0) {
      return [];
    }

    let pool: IStormRecord[];
    let nextGen: T[] = [];

    let props = Object.keys(gen[0].params);

    if (this.clone > 0) {
      gen = sort(gen.slice(), 'score', true);
      nextGen.push(...gen.slice(0, this.clone).map(c => c.params));
    }

    while (nextGen.length < this.generationSize) {
      pool = shuffle(gen.slice());
      let parentA = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
      let parentB = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];

      let child: T = this.cross(parentA, parentB);

      nextGen.push(child);
    }

    return nextGen;
  }

  abstract cross(parentA: IStormRecord, parentB: IStormRecord): T;
}