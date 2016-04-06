'use strict';

class NumberRangeGenerator
{
  constructor(min, count, step) {
    this.min = min || 0;
    this.count = count;
    this.step = step || 1;
  }

  * getValues() {
    for (let i = 0; i < this.count; i ++) {
      yield this.min + (i * this.step);
    }
  }
}

class RandomNumberGenerator
{
  constructor(min, max, count, isInteger) {
    this.min = min;
    this.max = max;
    this.range = max - min;
    this.isInteger = !!isInteger;

    if (typeof count === 'undefined') {
      throw new Error(`'count' is required!`);
    }

    this.count = count;
  }

  * getValues() {
    for (let i = 0; i < this.count; i++) {
      let result = (Math.random() * this.range) + this.min;

      if (this.isInteger) {
        result = Math.floor(result);
      }

      yield result;      
    }
  }
}

class ListGenerator
{
  constructor(values) {
    if (!(values instanceof Array)) {
      throw new Error(`'values' is required!`);
    }

    if (values.length === 0) {
      throw new Error(`'values' must have at least one element!`);
    } 
    
    this.values = values;
  }

  * getValues() {
    for (let i = 0; i < this.values.length; i++) {      
      yield this.values[i];      
    }
  }  
}  

class ArgumentGenerator
{
  constructor(params) {
    this.params = params;
  }

  * getUnits(props, obj) {
    props = props || [];

    // If we've covered all the properties...    
    if (props.length === 0) {
      // Then it might be the first time it is running...
      if (typeof obj === 'undefined') {
        // Initialize the list of properties...
        props = Object.keys(this.params);
        // And create the initial object.
        obj = {};
      } else {
        // Or we're all done, so yield and return.
        yield obj;
        return;
      }
    }

    // Grab the current property (the first one)...    
    let currentProp = props[0];
    let remainingProps = props.slice(1);
    // Loop through each value for the property...
    for (let val of this.params[currentProp].getValues()) {
      // Assign it to the object then pass it down to the next set.
      yield* this.getUnits(remainingProps, Object.assign({}, obj, {
        [currentProp]: val
      }));
    }
  }
}


module.exports = {
  NumberRangeGenerator,
  RandomNumberGenerator,
  ListGenerator,
  ArgumentGenerator
};