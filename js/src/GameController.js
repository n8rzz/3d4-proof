import { PLAYER } from './constants';

/**
 * @class GameController
 */
export default class GameController {
    /**
     * @for GameController
     * @param $element {HTMLElement|null}
     * @param gameView {GameView}
     * @param gameBoardController {GameBoardController}
     * @return {function}
     */
    constructor($element, gameView, gameBoardController) {
        this.$element = $element;
        this.$row = null;
        this.$cell = null;
        this.gameView = gameView;
        this.gameBoardController = gameBoardController;
        this.activePlayer = 0;

        return this.createChildren()
                    .enable();
    }

    /**
     * @for GameController
     * @method createChildren
     */
    createChildren() {
        this.$row = document.getElementsByClassName('js-gameBoard-row');
        this.$cell = document.querySelectorAll('.js-gameBoard-row td');

        return this;
    }

    /**
     * @for GameController
     * @method enable
     */
    enable() {
        Array.from(this.$cell).forEach((event) => {
            event.addEventListener('click', (e) => this.onClick(e));
        });
    }

    /**
     * @for GameController
     * @method disable
     */
    disable() {
        Array.from(this.$cell).forEach((event) => {
            event.removeEventListener('click', (e) => this.onClick(e));
        });
    }

    /**
     * @for GameController
     * @method destroy
     */
    destroy() {
        this.$element = null;
        this.$row = null;
        this.$cell = null;
        this.gameView = null;
        this.gameBoardController = null;
        this.activePlayer = 0;
    }

    /**
     * @for GameController
     * @method onClick
     * @param event {Event|object|null}
     * @return {function}
     */
    onClick(event) {
        event.preventDefault();

        const $target = event.currentTarget;
        const level = parseInt($target.parentElement.dataset.levelId, 10);
        const row = parseInt($target.parentElement.dataset.rowId, 10);
        const column = parseInt($target.dataset.cellId, 10);
        const playerMove = [level, row, column];

        return this.willExecutePlayerMove($target, playerMove);
    }

    /**
     * @for GameController
     * @method willExecutePlayerMove
     * @param $target {HTMLElement}
     * @param playerMove {array}
     */
    willExecutePlayerMove($target, playerMove) {
        if (!this.isValidMove(playerMove)) {
            alert('Move is invalid, please make a valid move');
            return;
        }

        this.executePlayerMove($target, playerMove);
        this.didExecutePlayerMove($target, playerMove);
    }

    /**
     * @for GameController
     * @method executePlayerMove
     * @param $target {HTMLElement}
     * @param playerMove {array}
     */
    executePlayerMove($target, playerMove) {
        this.gameBoardController.addPlayerAtPoint(this.activePlayer, playerMove);
        this.gameView.updateGameBoardWithPlayerPiece(this.activePlayer, $target);
    }

    /**
     * @for GameController
     * @method didExecutePlayerMove
     * @param $target {HTMLElement}
     * @param playerMove {array}
     */
    didExecutePlayerMove($target, playerMove) {
        this.gameBoardController.addToHistory(this.activePlayer, playerMove);

        const winningFormation = this.gameBoardController.findWinningFormation(this.activePlayer, playerMove);
        if (winningFormation !== null) {
            console.log('WINNER', winningFormation);
            alert(`Player ${this.activePlayer + 1} - WINNER!!`);

            return this.disable();
        }

        this.changeActivePlayer();

        return this;
    }

    /**
     * @for GameController
     * @method isValidMove
     * @param point {array}
     */
    isValidMove(point) {
        return this.gameBoardController.isValidMove(point);
    }

    /**
     * @for GameController
     * @method changeActivePlayer
     */
    changeActivePlayer() {
        this.activePlayer = this.activePlayer === PLAYER.ONE
            ? PLAYER.TWO
            : PLAYER.ONE;

        this.gameView.changeActivePlayerText(this.activePlayer);

        return this;
    }
}
