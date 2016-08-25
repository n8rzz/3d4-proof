export default class GameHistory {
    constructor() {
        this.history = {
            0: [],
            1: []
        };
    }

    addPlayerMoveToHistory(player, point) {
        this.history[player].push(point);
    }
}
