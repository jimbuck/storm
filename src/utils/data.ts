

export interface IDataGenerator<T>
{
  getValues(): Iterator<T>;

  nextValue(): T;

  nextValues(count: number): T[];
}

export abstract class BaseGenerator<T> implements IDataGenerator<T>
{
  protected iterator: Iterator<T>;

  abstract getValues(): Iterator<T>;

  public nextValue(): T {
    if (!this.iterator) {
      this.iterator = this.getValues();
    }

    return this.iterator.next().value;
  }

  public nextValues(count: number): T[] {
    let vals: T[] = [];
    for (let i = 0; i < count; i++) {
      vals.push(this.nextValue());
    }

    return vals;
  }
}

export class OrderedNumber extends BaseGenerator<number>
{
  public min: number;
  private range: number;
  public step: number;

  constructor(min: number, max: number, step?: number) {
    super();
    this.min = min;
    this.range = max - min;
    this.step = step || 1;
  }

  public * getValues() {
    let i = 0;

    while (true) {
      yield this.min + i;
      i += this.step;
      if (i > this.range) i = 0;
    }
  }
}

export class RandomNumber extends BaseGenerator<number>
{
  public min: number;
  public max: number;
  private range: number;
  public isInteger: boolean;

  constructor(min: number, max: number, isInteger?: boolean) {
    super();

    this.min = min;
    this.max = max;
    this.range = max - min;
    this.isInteger = !!isInteger;
  }

  public * getValues() {
    while (true) {
      let result = (Math.random() * this.range) + this.min;

      if (this.isInteger) {
        result = Math.floor(result);
      }

      yield result;
    }
  }
}

export class RandomInteger extends RandomNumber {
  constructor(min: number, max: number) {
    super(min, max, true);
  }
}

export class RandomFloat extends RandomNumber {
  constructor(min: number, max: number) {
    super(min, max, false);
  }
}

export class OrderedItem<T> extends BaseGenerator<T>
{
  public values: T[];

  constructor(values: T[]) {
    super();
    if (!(values instanceof Array)) {
      throw new Error(`'values' is required!`);
    }

    if (values.length === 0) {
      throw new Error(`'values' must have at least one element!`);
    }

    this.values = values;
  }

  public * getValues() {
    let i = 0;
    while (true) {
      yield this.values[i];
      i = (i + 1) % this.values.length;
    }
  }
}

export class ArgumentGenerator extends BaseGenerator<any>
{
  [key: string]: any;

  private params: any;
  private props: string[];
  private lookup: Map<string, Iterator<any>>;

  constructor(params: any) {
    super();

    if (!params) {
      throw new Error(`'params' is required!`);
    }

    if (Object.keys(params).length === 0) {
      throw new Error(`At least one property on 'param' must be defined to produce a unit!`);
    }

    this.params = params;
    this.props = Object.keys(this.params);

    this.lookup = new Map<string, Iterator<any>>();
    this.props.forEach(prop => {
      this.lookup.set(prop, this.params[prop].getValues());
    });
  }

  public * getValues() {
    while (true) {
      let obj: any = {};

      this.props.forEach(prop => {
        obj[prop] = this.lookup.get(prop).next().value;
      });

      yield obj;
    }
  }
}