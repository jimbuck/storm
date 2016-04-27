
export default class Time {
  constructor() {

  }

  static get current() {
    let hrtime = process.hrtime()
    return (hrtime[0] * 1000000 + hrtime[1] / 1000) / 1000;   
  }
}