
import {IDataGenerator, ArgumentGenerator} from '../../utils/data';
import {shuffle, random} from '../../utils/array';
import BaseSynthesizer from './base';

export default class StandardSynthesizer extends BaseSynthesizer
{
  /**
   * Creates a standard synthesizer, randomly mixing parents with a small chance of mutation.
   */
  constructor(options: {
    generationSize: number,
    params: ArgumentGenerator
  }) {
    super(options);
  }

  public breed(gen: any[]): any[] {

    if (gen.length === 0) {
      return [];
    }

    let nextGen:any[] = [];

    let props = Object.keys(gen[0]);    
    while (nextGen.length < this.generationSize) {
      let pool = shuffle(gen.slice());
      let parentA = pool.pop();
      let parentB = pool.pop();

      let child: any = {};

      for (let prop of props) {
        child[prop] = (Math.random() > 0.5) ? parentA[prop] : parentB[prop];
      }

      if (Math.random() < 0.25) {
        let randomProp = random(props);
        child[randomProp] = this.params.nextValue()[randomProp];
      }

      nextGen.push(child);      
    }
    
    return nextGen;    
  }
}