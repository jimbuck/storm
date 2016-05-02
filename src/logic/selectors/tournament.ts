
import {shuffle} from '../../utils/array';
import {IStormRecord} from '../models';
import {BaseSelector} from './base';

export default class Tournament extends BaseSelector
{
  public tournamentSize: number;

  constructor(opts:{tournamentSize:number, clone?: number}) {
    super();
    
    this.tournamentSize = opts.tournamentSize;
  }

  public select(gen: IStormRecord[], count: number) {
    let availablePlayers = gen.slice();
    let selection: IStormRecord[] = [];

    for (let i = 0; i < count; i++){
      // Copy, shuffle, and limit the players array.
      let players = shuffle(availablePlayers.slice()).slice(0, this.tournamentSize);

      let champion = this.tourney(players);

      selection.push(champion);
      availablePlayers.splice(availablePlayers.indexOf(champion), 1);
    }
    
    return selection;
  }

  protected tourney(players: IStormRecord[]): IStormRecord {
    //console.log(`\nStarting tournament with ${players.length} players!`, players);
    if (players.length === 1) {
      return players[0];
    }

    let winners: IStormRecord[] = [];

    while (players.length > 0)
    {
      if (players.length === 1) {
        winners.push(players[0]);
        break;
      }

      let a = players.splice(Math.floor(Math.random() * players.length), 1)[0];
      let b = players.splice(Math.floor(Math.random() * players.length), 1)[0];

      let victor = this.compare(a, b);
      //console.log(`${JSON.stringify(a)} vs. ${JSON.stringify(b)} -> ${JSON.stringify(victor)} wins!`);
      winners.push(victor);
    }

    //console.log(`Tournament done, with ${players.length} remaining!\n`);

    return this.tourney(winners);
  }
}