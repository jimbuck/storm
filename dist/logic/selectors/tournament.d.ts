import { IStormRecord } from '../models';
import BaseSelection from './base';
export default class Tournament extends BaseSelection {
    tournamentSize: number;
    constructor(opts: {
        tournamentSize: number;
    });
    select(gen: IStormRecord[], count: number): IStormRecord[];
    protected tourney(players: IStormRecord[]): IStormRecord;
}
