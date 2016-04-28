import { IStormRecord } from '../models';
import BaseSelection from './base';
export default class Top extends BaseSelection {
    constructor();
    select(gen: IStormRecord[], count: number): IStormRecord[];
}
