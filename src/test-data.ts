
import {IStormRecord} from './logic/models';
import BaseSelection from './logic/selectors/base';
import {BaseGenerator} from './utils/data';

export const PLAYER_A = { score: 1 };
export const PLAYER_B = { score: 2 };
export const PLAYER_C = { score: 3 };
export const PLAYER_D = { score: 5 };
export const PLAYER_E = { score: 8 };
export const PLAYER_F = { score: 13 };
export const PLAYERS = [PLAYER_D, PLAYER_A, PLAYER_F, PLAYER_B, PLAYER_E, PLAYER_C];

export class TestSelector extends BaseSelection
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