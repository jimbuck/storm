import { IStormRecord } from '../models';
export interface ISelector {
    select(gen: IStormRecord[], count: number): IStormRecord[];
}
export declare abstract class BaseSelector implements ISelector {
    abstract select(gen: IStormRecord[], count: number): IStormRecord[];
    protected compare(a: IStormRecord, b: IStormRecord): IStormRecord;
}
