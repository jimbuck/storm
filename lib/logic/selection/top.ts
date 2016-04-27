
import {IScorable} from '../models';
import BaseSelection from './base';

export default class Top extends BaseSelection
{
  constructor() {
    super();
  }
  
  select(gen: IScorable[], count: number): IScorable[] {    
    let players = gen.slice();
    
    players.sort(function (a, b) {
      return b.score - a.score;
    });

    return players.slice(0, count);
  }
}