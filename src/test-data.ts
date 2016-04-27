
import {IScorable} from './logic/models';
import BaseSelection from './logic/selection/base';
import {BaseGenerator} from './utils/data';

export const PLAYER_A: IScorable = { score: 1 };
export const PLAYER_B: IScorable = { score: 2 };
export const PLAYER_C: IScorable = { score: 3 };
export const PLAYER_D: IScorable = { score: 5 };
export const PLAYER_E: IScorable = { score: 8 };
export const PLAYER_F: IScorable = { score: 13 };
export const PLAYERS: IScorable[] = [PLAYER_D, PLAYER_A, PLAYER_F, PLAYER_B, PLAYER_E, PLAYER_C];


export class TestSelection extends BaseSelection
{
  constructor() {
    super();
  }

  select(gens: IScorable[], count: number) {
    return [];
  }

  runCompare(a: IScorable, b: IScorable) {
    return this.compare(a, b);
  }
}

export class TestGenerator extends BaseGenerator<number>
{
  * getValues() {
    yield 1;
    yield 2;
    yield 3;
  }

  hasIterator() {
    return typeof this.iterator !== 'undefined';
  }
}