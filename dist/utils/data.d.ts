export interface IDataGenerator<T> {
    getValues(): Iterator<T>;
    nextValue(): T;
    nextValues(count: number): T[];
}
export interface IDynamicParams {
    [prop: string]: IDataGenerator<any>;
}
export declare abstract class BaseGenerator<T> implements IDataGenerator<T> {
    protected iterator: Iterator<T>;
    abstract getValues(): Iterator<T>;
    nextValue(): T;
    nextValues(count: number): T[];
}
export declare class OrderedNumber extends BaseGenerator<number> {
    min: number;
    private range;
    step: number;
    constructor(min: number, max: number, step?: number);
    getValues(): IterableIterator<number>;
}
export declare class RandomNumber extends BaseGenerator<number> {
    min: number;
    max: number;
    private range;
    isInteger: boolean;
    constructor(min: number, max: number, isInteger?: boolean);
    getValues(): IterableIterator<number>;
}
export declare class RandomInteger extends RandomNumber {
    constructor(min: number, max: number);
}
export declare class RandomFloat extends RandomNumber {
    constructor(min: number, max: number);
}
export declare class OrderedItem<T> extends BaseGenerator<T> {
    values: T[];
    constructor(values: T[]);
    getValues(): IterableIterator<T>;
}
export declare class ArgumentGenerator extends BaseGenerator<IDynamicParams> {
    [key: string]: any;
    private params;
    private props;
    private lookup;
    constructor(params: IDynamicParams);
    getValues(): IterableIterator<any>;
}
