"use strict";
const base_1 = require('./base');
class Tournament extends base_1.default {
    constructor(opts) {
        super();
        this.tournamentSize = opts.tournamentSize;
    }
    select(gen, count) {
        let availablePlayers = gen.slice();
        let selection = [];
        for (let i = 0; i < count; i++) {
            // Copy, shuffle, and limit the players array.
            let players = shuffle(availablePlayers.slice()).slice(0, this.tournamentSize);
            let champion = this.tourney(players);
            selection.push(champion);
            availablePlayers.splice(availablePlayers.indexOf(champion), 1);
        }
        return selection;
    }
    tourney(players) {
        //console.log(`\nStarting tournament with ${players.length} players!`, players);
        if (players.length === 1) {
            return players[0];
        }
        let winners = [];
        while (players.length > 0) {
            if (players.length === 1) {
                winners.push(players[0]);
                break;
            }
            let a = players.splice(Math.floor(Math.random() * players.length), 1)[0];
            let b = players.splice(Math.floor(Math.random() * players.length), 1)[0];
            let victor = this.compare(a, b);
            //console.log(`${JSON.stringify(a)} vs. ${JSON.stringify(b)} -> ${JSON.stringify(victor)} wins!`);
            winners.push(victor);
        }
        //console.log(`Tournament done, with ${players.length} remaining!\n`);
        return this.tourney(winners);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tournament;
/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(source) {
    let result = new Array(source.length);
    let randomIndex, temp, end;
    for (end = source.length; end; end -= 1) {
        randomIndex = Math.floor(Math.random() * end);
        temp = source[end - 1];
        source[end - 1] = source[randomIndex];
        source[randomIndex] = temp;
    }
    return source;
}
//# sourceMappingURL=tournament.js.map