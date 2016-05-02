
import {IStormRecord} from './logic/models';
import {BaseSelector} from './logic/selectors/base';
import {BaseGenerator} from './utils/data';

export const PLAYER_A = { score: 1 };
export const PLAYER_B = { score: 2 };
export const PLAYER_C = { score: 3 };
export const PLAYER_D = { score: 5 };
export const PLAYER_E = { score: 8 };
export const PLAYER_F = { score: 13 };
export const PLAYERS = [PLAYER_D, PLAYER_A, PLAYER_F, PLAYER_B, PLAYER_E, PLAYER_C];

export class TestSelector extends BaseSelector
{
  constructor() {
    super();
  }

  select(gens: IStormRecord[], count: number): any[] {
    return [];
  }

  runCompare(a: IStormRecord, b: IStormRecord) {
    return this.compare(a, b);
  }
}

export function randomStormResult(score: number, params?: any):IStormRecord {
  return {
    id: Math.floor(Math.random() * 99999999),
    generation: Math.floor(Math.random() * 999),
    success: true,
    score: score,
    time: 0,
    result: Math.random()*99999,
    params: params || {
      x: Math.floor(Math.random() * 20) - 10,
      y: Math.floor(Math.random() * 20) - 10
    }    
  };
}