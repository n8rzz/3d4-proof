const CLASSNAMES = {
    ACTIVE_PLAYER: 'js-activePlayer',
    PLAYER_ONE_MOVE: 'isPlayerOneMove',
    PLAYER_TWO_MOVE: 'isPlayerTwoMove'
};

const PLAYER = {
    ONE: 0,
    TWO: 1
};

/**
 * @class GameView
 */
export default class GameView {
    /**
     * @for GameView
     * @constructor
     */
    constructor($element = null) {
        this.$element = $element;
        this.$activePlayer = null;

        return this.createChildren();
    }

    /**
     * @for GameView
     * @method createChildren
     */
    createChildren() {
        this.$activePlayer = document.getElementsByClassName(CLASSNAMES.ACTIVE_PLAYER)[0];

        return this;
    }

    /**
     * @for GameView
     * @method destroy
     */
    destroy() {
        this.$element = null;
        this.$activePlayer = null;

        return this;
    }

    /**
     * @for GameView
     * @method changePlayer
     * @param id {number}
     */
    changePlayer(id) {
        const playerNumber = id + 1;
        this.$activePlayer.textContent = playerNumber;

        return this;
    }

    /**
     * @for GameView
     * @method changeActivePlayerText
     * @param playerId {number}
     * @param $target {HTMLElement}
     */
    changeActivePlayerText(playerId, $target) {
        if (playerId === PLAYER.ONE && !$target.classList.contains(CLASSNAMES.PLAYER_ONE_MOVE)) {
            this._addClassToTableTargetCell($target, CLASSNAMES.PLAYER_ONE_MOVE);
        } else if (playerId === PLAYER.TWO && !$target.classList.contains(CLASSNAMES.PLAYER_TWO_MOVE)) {
            this._addClassToTableTargetCell($target, CLASSNAMES.PLAYER_TWO_MOVE);
        }
    }

    /**
     * @private
     * @for GameView
     * @method _addClassToTableTargetCell
     * @param $target {HTMLElement}
     * @param className {string}
     */
    _addClassToTableTargetCell($target, className) {
        $target.classList.add(className);
    }
}
