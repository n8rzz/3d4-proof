class GameHistory {
    constructor() {
        this._history = {
            0: [],
            1: []
        };
    }

    addPlayerMoveToHistory(player, point) {
        this._history[player].push(point);
    }
}

export default new GameHistory();
