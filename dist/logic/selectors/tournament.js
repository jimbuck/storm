"use strict";
const array_1 = require('../../utils/array');
const base_1 = require('./base');
class Tournament extends base_1.BaseSelector {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91cm5hbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sb2dpYy9zZWxlY3RvcnMvdG91cm5hbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esd0JBQXNCLG1CQUFtQixDQUFDLENBQUE7QUFFMUMsdUJBQTJCLFFBQVEsQ0FBQyxDQUFBO0FBRXBDLHlCQUF3QyxtQkFBWTtJQUlsRCxZQUFZLElBQTRDO1FBQ3RELE9BQU8sQ0FBQztRQUVSLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sTUFBTSxDQUFDLEdBQW1CLEVBQUUsS0FBYTtRQUM5QyxJQUFJLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQyxJQUFJLFNBQVMsR0FBbUIsRUFBRSxDQUFDO1FBRW5DLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDOUIsOENBQThDO1lBQzlDLElBQUksT0FBTyxHQUFHLGVBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRTlFLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFckMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QixnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFUyxPQUFPLENBQUMsT0FBdUI7UUFDdkMsZ0ZBQWdGO1FBQ2hGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLENBQUM7UUFFRCxJQUFJLE9BQU8sR0FBbUIsRUFBRSxDQUFDO1FBRWpDLE9BQU8sT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ3pCLENBQUM7WUFDQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLEtBQUssQ0FBQztZQUNSLENBQUM7WUFFRCxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV6RSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoQyxrR0FBa0c7WUFDbEcsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBRUQsc0VBQXNFO1FBRXRFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7QUFDSCxDQUFDO0FBdEREOzRCQXNEQyxDQUFBIn0=