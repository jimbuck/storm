import {Readable} from 'stream';

import {IStormConfig, IStormRecord, StormResult} from './logic/models';
import {ArgumentGenerator} from './utils/data';

import time from './utils/time';

import BaseSelector from './logic/selectors/base';
import Tournament from './logic/selectors/tournament';

const identity = (thing: any) => { return thing };

let trialId = 0;

// Expose these helper classes.
export {
  OrderedNumber,
  RandomInteger,
  RandomFloat,
  OrderedItem
} from './utils/data';

export interface DoneFunction
{
  (gen: number, current: StormResult): boolean;
}

/**
 * An advanced optimization library.
 */
export class Storm extends Readable
{
  public params: ArgumentGenerator;
  public done: DoneFunction;

  private isStream: boolean;
  private isPromise: boolean;
  public run: (params: any) => PromiseLike<any>;
  public score: (data: any) => number;
  
  public generationSize: number;
  private currentIteration: number;
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

    super({ objectMode: true });
    
    this.params = new ArgumentGenerator(options.params); 

    this.isStream = false;
    this.isPromise = false;
    
    if (typeof options.done === 'number') {
      let doneNum = options.done as number;
      this.done = (gen: number, result: StormResult) => {
        return gen >= doneNum;
      };
    } else {
      this.done = options.done as DoneFunction;
    }

    this.selector = options.selector || new Tournament({
      tournamentSize: Math.max(5, Math.floor(this.generationSize * 0.2))
    });
  }

  public _read() {
    if (this.isPromise) {
      throw new Error(`'Once 'start' is called you cannot stream!`);
    }
    this.isStream = true;
    
    this.step().then((generation: IStormRecord[]) => {
      if (generation) {
        generation.forEach(result => this.push(result));
      } else {
        this.push(null);
      }
    });  
  }

  public start(): PromiseLike<StormResult> {
    if (this.isStream) {
      throw new Error(`'Once 'pipe' is called you cannot use promises!`);
    }
    this.isPromise = true;
    
    this.results = new StormResult();
    return this._stepUntilDone();
  }

  private async _stepUntilDone(): Promise<StormResult> {
    let generation = await this.step();
    
    this.results.add(generation);
    
    if (this.done(this.currentIteration, this.results)) {
      return this.results;
    } else {
      return await this._stepUntilDone();
    }
  }

  /**
   * Steps one generation forward, adding the data to this.results.
   */ 
  private async step(): Promise<IStormRecord[]> {

    let generation: IStormRecord[] = [];

    for (let i = 0; i < this.generationSize; i++) {
      let id = trialId++;
      //console.log(`Starting task ${id}...`);
      let unit = this.params.nextValue();

      // Stop when all units have been processed...    
      if (typeof unit === 'undefined') {
        return null;
      }

      let startTime = time.current;

      let record: IStormRecord;
      
      try {
        let result = await this.run.call(unit, unit);
        let timeDiff = time.current - startTime;
        record = {
          id: id,
          iteration: this.currentIteration,
          success: true,
          time: timeDiff,
          params: unit,
          result,
          score: 0
        };
        record.score = this.score(record) || 0;
                
      } catch (ex) {
        let timeDiff = time.current - startTime;
        record = {
          id: id,
          iteration: this.currentIteration,
          success: false,
          time: timeDiff,
          params: unit,
          result: ex,
          score: null // Should this be zero? -1?
        };
      }

      generation.push(record);
    }

    return generation;
  }
}