import { IStormRecord } from '../models';
import { BaseSelector } from './base';
export default class Top extends BaseSelector {
    constructor();
    select(gen: IStormRecord[], count: number): IStormRecord[];
}
