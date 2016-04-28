import { IStormRecord } from '../models';
declare abstract class BaseSelector {
    abstract select(gen: IStormRecord[], count: number): IStormRecord[];
    protected compare(a: IStormRecord, b: IStormRecord): IStormRecord;
}
export default BaseSelector;
