import { IStormRecord } from '../models';
import { BaseSelector } from './base';
export default class Tournament extends BaseSelector {
    tournamentSize: number;
    constructor(opts: {
        tournamentSize: number;
        clone?: number;
    });
    select(gen: IStormRecord[], count: number): IStormRecord[];
    protected tourney(players: IStormRecord[]): IStormRecord;
}
