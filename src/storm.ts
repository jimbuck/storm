import {Readable} from 'stream';

import {IStormConfig, IStormRecord, StormResult} from './logic/models';
import {ArgumentGenerator} from './utils/data';

import time from './utils/time';

import {ISelector} from './logic/selectors/base';
import Tournament from './logic/selectors/tournament';

import {BaseSynthesizer, ISynthesizer} from './logic/synthesizers/base';
import StandardSynthesizer from './logic/synthesizers/standard';

const identity = (thing: any) => { return thing };

let trialId = 0;

// Expose helper classes and types.
export {OrderedNumber, RandomInteger, RandomFloat, OrderedItem} from './utils/data';
export {IStormConfig, IStormRecord, StormResult} from './logic/models';
export {ISelector} from './logic/selectors/base';
export {BaseSynthesizer, ISynthesizer} from './logic/synthesizers/base';

export interface DoneFunction
{
  (gen: number, current: StormResult): boolean;
}

/**
 * An advanced optimization library.
 */
export class Storm// extends Readable
{
  public params: ArgumentGenerator;
  public done: DoneFunction;

  private isStream: boolean;
  private isPromise: boolean;
  public run: (params: any) => PromiseLike<any>;
  public score: (data: IStormRecord) => number;
  
  public generationSize: number;

  public selector: ISelector;
  public synthesizer: ISynthesizer<any>;

  /**
   * Creates a new Storm instance ready for execution.
   * @param {IStormConfig} options - An object hash containing configuration settings.
   */  
  constructor(options: IStormConfig)
  {
    if (typeof options === 'undefined') {
      throw new Error(`Options must be specified!`);
    }

    if (typeof options.params === 'undefined') {
      throw new Error(`'params' must be specified!`);
    }

    if (typeof options.done !== 'number' && typeof options.done !== 'function') {
      throw new Error(`'done' must be specified!`);
    }

    if (typeof options.generationSize === 'undefined') {
      throw new Error(`'generationSize' must be specified!`);
    }

    if (typeof options.run !== 'function') {
      throw new Error(`'run' must be specified!`);
    }

    //super({ objectMode: true });

    this.generationSize = options.generationSize;
    this.params = new ArgumentGenerator(options.params); 
        
    this.isStream = false;
    this.isPromise = false;
    
    if (typeof options.done === 'number') {
      let doneNum = (options.done as number) - 1;
      this.done = (gen: number, result: StormResult) => {
        return gen >= doneNum;
      };
    } else {
      this.done = options.done as DoneFunction;
    }

    this.run = options.run;
    this.score = options.score;

    this.selector = options.selector || new Tournament({
      tournamentSize: Math.max(4, Math.floor(this.generationSize * 0.2))
    });

    this.synthesizer = new StandardSynthesizer({
      generationSize: this.generationSize,
      params: this.params,
      clone: options.clone
    });
    
    if (typeof options.cross !== 'undefined') {
      this.synthesizer.cross = options.cross;
    }
  }

  // public _read() {
  //   if (this.isPromise) {
  //     throw new Error(`'Once 'start' is called you cannot stream!`);
  //   }
  //   this.isStream = true;
    
  //   this.step().then((generation: IStormRecord[]) => {
  //     if (generation) {
  //       generation.forEach(result => this.push(result));
  //     } else {
  //       this.push(null);
  //     }
  //   });  
  // }

  public async start(): Promise<StormResult> {
    if (this.isStream) {
      throw new Error(`'Once 'pipe' is called you cannot use promises!`);
    }
    this.isPromise = true;

    let currentGeneration = 0;
    let result = new StormResult();
    
    let generation: IStormRecord[];
    
    do {
      // Update the generation...
      generation = await this.step(generation, currentGeneration);
      // Add the results...
      result.add(generation);
    } while (!this.done(currentGeneration++, result));

    return result;
  }

  /**
   * Steps one generation forward, adding the data to this.results.
   */  
  public async step(prevGen?: IStormRecord[], currentGeneration?: number): Promise<IStormRecord[]>
  {
    let currentGen: any[];

    if (prevGen) {
      currentGen = this.synthesizer.breed(prevGen);
    } else {
      currentGen = this.params.nextValues(this.generationSize);
    }

    let results: IStormRecord[] = [];
    
    for (let i = 0; i < currentGen.length; i++){
      let id: number = trialId++;
      let params: any = currentGen[i];
      
      let startTime: number = time.current;

      let record: IStormRecord;
      
      try {
        let result = await this.run.call(params, params);
        let timeDiff = time.current - startTime;
        record = {
          id: id,
          generation: currentGeneration,
          success: true,
          time: timeDiff,
          params,
          result,
          score: 0
        };
        record.score = this.score(record) || 0;
                
      } catch (ex) {
        let timeDiff = time.current - startTime;
        record = {
          id: id,
          generation: currentGeneration,
          success: false,
          time: timeDiff,
          params,
          result: ex,
          score: 0
        };
      }

      results.push(record);
    }

    return results;
  }
}