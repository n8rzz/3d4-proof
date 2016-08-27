/**
 * @class GameHistory
 */
export default class GameHistory {
    constructor() {
        this.length = 0;
        this.history = {
            0: [],
            1: []
        };
    }

    /**
     * @method addPlayerMoveToHistory
     * @param player {number}
     * @param point {array}
     */
    addPlayerMoveToHistory(player, point) {
        this.history[player].push(point);
        this.length++;
    }

    reportGameHistory() {
        console.log(this.history);
    }
}
