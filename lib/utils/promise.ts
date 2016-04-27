

export default class PromiseHelper
{
  constructor() {

  }

  static series(handlers: ((value?:any)=> any)[]) {
    if (!((handlers instanceof Array))) {
      throw new Error(`'handlers' must be an array of functions!`);
    }
    
    let p = Promise.resolve();

    handlers.forEach(fn => {
      p = p.then(fn);
    });

    return p;    
  }

  static times(fn: (value:any)=>void, times: number) {
    if (typeof times !== 'number') {
      throw new Error(`'times' must be an integer!`);
    }

    if (times <= 0) {
      throw new Error(`'times' must be greater than 0!`)
    }

    let p = Promise.resolve();

    for (let i = 0; i < times; i++){
      p = p.then(() => fn(i));
    }

    return p;
  }  
}