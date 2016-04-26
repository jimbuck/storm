'use strict';

const BaseSelection = require('./base');

class Top extends BaseSelection
{
  constructor(opts) {
    super(opts);
  }
  
  select(gen, count) {
    super.select(gen, count);
    
    let players = gen.slice();
    
    players.sort(function (a, b) {
      return b.score - a.score;
    });

    return players.slice(0, this.count);
  }
}

module.exports = Top;