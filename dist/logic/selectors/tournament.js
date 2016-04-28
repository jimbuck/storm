"use strict";
const array_1 = require('../../utils/array');
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
            let players = array_1.shuffle(availablePlayers.slice()).slice(0, this.tournamentSize);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91cm5hbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sb2dpYy9zZWxlY3RvcnMvdG91cm5hbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esd0JBQXNCLG1CQUFtQixDQUFDLENBQUE7QUFFMUMsdUJBQTBCLFFBQVEsQ0FBQyxDQUFBO0FBRW5DLHlCQUF3QyxjQUFhO0lBSW5ELFlBQVksSUFBNEI7UUFDdEMsT0FBTyxDQUFDO1FBRVIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzVDLENBQUM7SUFFTSxNQUFNLENBQUMsR0FBbUIsRUFBRSxLQUFhO1FBQzlDLElBQUksZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25DLElBQUksU0FBUyxHQUFtQixFQUFFLENBQUM7UUFFbkMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUM5Qiw4Q0FBOEM7WUFDOUMsSUFBSSxPQUFPLEdBQUcsZUFBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFOUUsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVyQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pCLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakUsQ0FBQztRQUVELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVTLE9BQU8sQ0FBQyxPQUF1QjtRQUN2QyxnRkFBZ0Y7UUFDaEYsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsQ0FBQztRQUVELElBQUksT0FBTyxHQUFtQixFQUFFLENBQUM7UUFFakMsT0FBTyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDekIsQ0FBQztZQUNDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsS0FBSyxDQUFDO1lBQ1IsQ0FBQztZQUVELElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXpFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLGtHQUFrRztZQUNsRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFFRCxzRUFBc0U7UUFFdEUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0IsQ0FBQztBQUNILENBQUM7QUF0REQ7NEJBc0RDLENBQUEifQ==