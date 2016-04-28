import {Readable} from 'stream';

import {IStormConfig, IStormRecord, StormResult} from './logic/models';
import {ArgumentGenerator, IDynamicParams} from './utils/data';

import time from './utils/time';

import BaseSelector from './logic/selectors/base';
import Tournament from './logic/selectors/tournament';

const identity = (thing: any) => { return thing };

let trialId = 0;

// Expose helper classes and types.
export {OrderedNumber, RandomInteger, RandomFloat, OrderedItem} from './utils/data';
export {IStormConfig, IStormRecord, StormResult} from './logic/models';

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
  private currentGeneration: number;
  private results: StormResult;

  public selector: BaseSelector;

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
      tournamentSize: Math.max(5, Math.floor(this.generationSize * 0.2))
    });

    this.currentGeneration = 0;
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
    this.currentGeneration = 0;

    let result = new StormResult();
    result.add(await this.step());

    while (!this.done(this.currentGeneration++, result)) {
      result.add(await this.step(result.gen));
    }

    return result;
  }

  /**
   * Steps one generation forward, adding the data to this.results.
   */  
  public async step(prevGen?: IStormRecord[]): Promise<IStormRecord[]>
  {
    let currentGen: IDynamicParams[];

    if (prevGen) {
      currentGen = this.params.nextValues(this.generationSize);//this.mutator.next(prevGen);
    } else {
      currentGen = this.params.nextValues(this.generationSize);
    }

    let results: IStormRecord[] = [];
    
    for (let i = 0; i < currentGen.length; i++){
      let id: number = trialId++;
      let params: IDynamicParams = currentGen[i];
      
      let startTime: number = time.current;

      let record: IStormRecord;
      
      try {
        let result = await this.run.call(params, params);
        let timeDiff = time.current - startTime;
        record = {
          id: id,
          generation: this.currentGeneration,
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
          generation: this.currentGeneration,
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