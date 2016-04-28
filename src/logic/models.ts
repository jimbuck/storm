import BaseSelector from './selectors/base';

import {IDynamicParams} from '../utils/data';

/**
 * Configuration Settings for a standard Storm instance.
 */
export interface IStormConfig
{
  /**
   * The is the data object that will be modified and provided during trials.
   */
  params: any;

  /**
   * The maxium number of generations, or a function which returns a boolean indicating when complete.
   * When it is a function two parameters are recieved: generation number and current results (min, max, all, etc.).
   */
  done: ((i: number, current: StormResult) => boolean) | number;

  /**
   * The maximum size of each generation. 
   */
  generationSize: number;

  /**
   * Used to execute target code by mapping supplied parameters to the correct usage.
   * @param {TInput} params - The dynamic data set created randomly or via breeding/mutation.
   */
  run: (params: any) => any|PromiseLike<any>;

  /**
   * An optional transform function to convert a result into a numerical score.
   * @param {IStormRecord} record - The current record, including runtime duration, initial parameters, and result data.
   */  
  score?: (record: IStormRecord) => number;

  /**
   * Optional object for handling the selection of the best canidates from each generation.
   */  
  selector?: BaseSelector;
}

/**
 * An unabridged collection of records with aggregated data used at the end of each generation.
 */
export class StormResult
{

  /**
   * The sum of all of the scores across all generations (used to find averages).
   */  
  private totalScore: number;

  /**
   * The total number of generations.
   */  
  public totalGenerations: number;

  /**
   * The average score across all generations.
   */
  public get avg():number {
    return this.totalScore / this.all.length;
  }

  /**
   * The average score for the current generation.
   */  
  public avgGen: number;

  /**
   * The lowest scored record for the current generation.
   */
  public minGen: IStormRecord;

  /**
   * The highest scored record for the current generation.
   */
  public maxGen: IStormRecord;

  /**
   * All records for the current generation.
   */
  public gen: IStormRecord[];

  /**
   * The lowest scored record across all generations.
   */
  public min: IStormRecord;

  /**
   * The highest scored record across all generations.
   */
  public max: IStormRecord;

  /**
   * All records across all generations.
   */
  public all: IStormRecord[];

  /**
   * Creates a new StormResult to house the generation and lifetime data.
   */
  constructor() {
    this.all = [];
    this.gen = [];
    this.totalGenerations = 0;
    this.totalScore = 0;
    this.avgGen = 0;
    this.min = { score: Number.MAX_VALUE } as IStormRecord;
    this.max = { score: Number.MIN_VALUE } as IStormRecord;
    this.minGen = { score: Number.MAX_VALUE } as IStormRecord;
    this.maxGen = { score: Number.MIN_VALUE } as IStormRecord; 
  }

  /**
   * Adds a new generation to the result instance.
   */  
  public add(results: IStormRecord[]) {
    this.gen = [];
    let genTotalScore = 0;
    results.forEach(result => {
      genTotalScore += result.score;

      if (result.score < this.min.score) {
        this.min = result;
      }
      if (result.score > this.max.score) {
        this.max = result;
      }
      if (result.score < this.minGen.score) {
        this.minGen = result;
      }
      if (result.score > this.maxGen.score) {
        this.maxGen = result;
      }
      this.gen.push(result);
      this.all.push(result);
    });
    this.totalGenerations++;
    this.totalScore += genTotalScore;
    this.avgGen = genTotalScore / results.length;
  } 
}

/**
 * A single unit representing a completed run.
 */
export interface IStormRecord
{
  /**
   * The unique identifier for the record.
   */
  id: number;

  /**
   * The generation number of the record.
   */
  generation: number;

  /**
   * The score this record has revieved. If the trial failed, the score will be zero.
   */
  score: number;

  /**
   * Flag to determine if the trial was succesful.
   */  
  success: boolean;
  
  /**
   * The dynamic dataset that was provided in this trial.
   */
  params: any;

  /**
   * The calculated result of the run function.
   */
  result: any;

  /**
   * The number of milliseconds it took for this trial to execute.
   */
  time: number;
}