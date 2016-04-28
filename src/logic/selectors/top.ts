
import {IStormRecord} from '../models';
import BaseSelection from './base';

export default class Top extends BaseSelection
{
  constructor() {
    super();
  }
  
  select(gen: IStormRecord[], count: number): IStormRecord[] {    
    let players = gen.slice();
    
    players.sort(function (a, b) {
      return b.score - a.score;
    });

    return players.slice(0, count);
  }
}