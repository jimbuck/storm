import { IStormRecord } from './logic/models';
import { BaseSelector } from './logic/selectors/base';
export declare const PLAYER_A: {
    score: number;
};
export declare const PLAYER_B: {
    score: number;
};
export declare const PLAYER_C: {
    score: number;
};
export declare const PLAYER_D: {
    score: number;
};
export declare const PLAYER_E: {
    score: number;
};
export declare const PLAYER_F: {
    score: number;
};
export declare const PLAYERS: {
    score: number;
}[];
export declare class TestSelector extends BaseSelector {
    constructor();
    select(gens: IStormRecord[], count: number): any[];
    runCompare(a: IStormRecord, b: IStormRecord): IStormRecord;
}
export declare function randomStormResult(score: number, params?: any): IStormRecord;
