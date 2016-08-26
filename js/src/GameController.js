const PLAYER = {
    ONE: 0,
    TWO: 1
};

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
        const moveToMake = [level, row, column];

        return this.willExecutePlayerMove($target, moveToMake);
    }

    /**
     * @for GameController
     * @method willExecutePlayerMove
     */
    willExecutePlayerMove($target, moveToMake) {
        if (!this.isValidMove(moveToMake)) {
            alert('Move is invalid, please make a valid move');
            return;
        }

        this.executePlayerMove(moveToMake);
        this.didExecutePlayerMove($target);
    }

    /**
     * @for GameController
     * @method executePlayerMove
     */
    executePlayerMove(point) {
        this.gameBoardController.willMove(this.activePlayer, point);
    }

    /**
     * @for GameController
     * @method didExecutePlayerMove
     */
    didExecutePlayerMove($target) {
        this.gameView.changeActivePlayerText(this.activePlayer, $target);
        this.playerDidMove();

        return this;
    }

    /**
     * @for GameController
     * @method isValidMove
     */
    isValidMove(point) {
        return this.gameBoardController.isValidMove(point);
    }

    /**
     * @for GameController
     * @method playerDidMove
     */
    playerDidMove() {
        if (this.activePlayer === PLAYER.ONE) {
            this.activePlayer = PLAYER.TWO;
            this.gameView.changePlayer(PLAYER.TWO);
        } else {
            this.activePlayer = PLAYER.ONE;
            this.gameView.changePlayer(PLAYER.ONE);
        }

        return this;
    }
}
