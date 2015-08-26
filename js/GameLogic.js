$(document).ready(function() {
    'use strict';

    var SELECTORS = {
        IS_PLAYER_ONE_MOVE: {
            KEY: 'isPlayerOneMove',
            VALUE: '.isPlayerOneMove'
        },
        IS_PLAYER_TWO_MOVE: {
            KEY: 'isPlayerTwoMove',
            VALUE: '.isPlayerTwoMove'
        }
    };

    var PLAYER = {
        ONE: 0,
        TWO: 1
    };

//* --------------------------------------------------------------------
//* --------------------------------------------------------------------
    /**
     * @class GameView
     * @constructor
     */
    var GameView = (function() {
        var GameView = function($element) {
            return this._init($element);
        };

        GameView.prototype._init = function($element) {
            this._$element = $element;
            this._$activePlayer = null;

            return this._createChildren();
        };

        GameView.prototype._createChildren = function() {
            this._$activePlayer = this._$element.find('.js-activePlayer');

            return this;
        };

        GameView.prototype._destroy = function() {
            this._$element = null;
            this._$activePlayer = null;

            return this;
        };

        GameView.prototype.changePlayer = function(id) {
            var player = id + 1;
            this._$activePlayer.text(player);
        };

        GameView.prototype.makePlayerMove = function(playerId, $target) {
            if (playerId == PLAYER.ONE && !$target.hasClass(SELECTORS.IS_PLAYER_ONE_MOVE.KEY)) {
                $target.addClass(SELECTORS.IS_PLAYER_ONE_MOVE.KEY);

            } else if (playerId == PLAYER.TWO && !$target.hasClass(SELECTORS.IS_PLAYER_TWO_MOVE.KEY)) {
                $target.addClass(SELECTORS.IS_PLAYER_TWO_MOVE.KEY);
            }
        };

        return GameView;
    })();

//* --------------------------------------------------------------------
//* --------------------------------------------------------------------
    /**
     * @class GameLogicController
     * @constructor
     */
    var GameLogicController = (function() {
        var GameLogicController = function() {

            return this._init();
        };

        GameLogicController.prototype._init = function() {
            this._gameBoard = [];

            return this;
        };


        GameLogicController.prototype.isWinningMove = function(gameBoard) {
            this._gameBoard = gameBoard;

            if (this._isSimpleRowWin()) {
                return true;

            } else if (this._isSimpleColumnWin()) {
                return true;

            } else if (this._isSimpleDiagonalWin()) {
                return true;

            } else if (this._isComplexStackWin()) {
                return true;

            } else if (this._isComplexRowStaircaseWin()) {
                return true;

            } else if (this._isComplexColoumnStaircaseWin()) {
                return true;

            } else if (this._isComplexDiagonalWin()) {
                return true;

            }


            this._gameBoard = [];

            return false;
        };


        ////////////////////////////////////////////////////////////////
        /// HELPERS
        ////////////////////////////////////////////////////////////////

        GameLogicController.prototype._isSimpleRowWin = function() {
            var l;
            var level;
            var r;
            var row;

            for (l = 0; l < this._gameBoard.length; l++) {
                level = this._gameBoard[l];

                for (r = 0; r < level.length; r++) {
                    row = level[r];

                    if (row[0] === null ||
                        row[1] === null ||
                        row[2] === null ||
                        row[3] === null) {
                        continue;
                    } else if (row[0] !== row[1] ||
                        row[1] !== row[2] ||
                        row[2] !== row[3]) {
                        continue;
                    }

                    if (row[0] === row[1] &&
                        row[1] === row[2] &&
                        row[2] === row[3]) {
                        console.log(r, row);

                        return true;
                    }
                }
            }

            return false;
        };

        GameLogicController.prototype._isSimpleColumnWin = function() {
            var l;
            var level;
            var c;
            var column;

            for (l = 0; l < this._gameBoard.length; l++) {
                level = this._gameBoard[l];

                for (c = 0; c < level.length; c++) {
                    if (level[0][c] === null ||
                        level[1][c] === null ||
                        level[2][c] === null ||
                        level[3][c] === null) {
                        continue;
                    } else if (level[0][c] !== level[1][c] ||
                        level[1][c] !== level[2][c] ||
                        level[2][c] !== level[3][c]) {
                        continue;
                    }

                    if (level[0][c] === level[1][c] && level[1][c] === level[2][c] && level[2][c] === level[3][c]) {
                        console.log(c, [level[0][c], level[1][c], level[2][c], level[3][c]]);
                        return true;
                    }
                }
            }

            return false;
        };

        GameLogicController.prototype._isSimpleDiagonalWin = function() {
            var l;
            var level;

            for (l = 0; l < this._gameBoard.length; l++) {
                level = this._gameBoard[l];

                if (level[0][3] !== null &&
                    level[1][2] !== null &&
                    level[2][1] !== null &&
                    level[3][0] !== null) {

                    if (level[0][3] === level[1][2] &&
                        level[1][2] === level[2][1] &&
                        level[2][1] === level[3][0]) {
                        console.log(level);
                        return true;
                    }
                } else if (level[0][0] !== null &&
                    level[1][1] !== null &&
                    level[2][2] !== null &&
                    level[3][3] !== null) {

                    if (level[0][0] === level[1][1] &&
                        level[1][1] === level[2][2] &&
                        level[2][2] === level[3][3]) {
                        console.log(level);
                        return true;
                    }
                }

            }

            return false;
        };

        GameLogicController.prototype._isComplexStackWin = function() {
            var l;
            var r;
            var c;

            for (r = 0; r < this._gameBoard[0].length; r++) {
                for (c = 0; c < this._gameBoard[0][r].length; c++) {
                    if (this._gameBoard[0][r][c] !== null &&
                        this._gameBoard[1][r][c] !== null &&
                        this._gameBoard[2][r][c] !== null &&
                        this._gameBoard[3][r][c] !== null) {

                        if (this._gameBoard[0][r][c] === this._gameBoard[1][r][c] &&
                            this._gameBoard[1][r][c] === this._gameBoard[2][r][c] &&
                            this._gameBoard[2][r][c] === this._gameBoard[3][r][c]) {
                                return true;
                        }
                    }
                }
            }

            return false;
        };


        GameLogicController.prototype._isComplexRowStaircaseWin = function() {
            var r;

            for (r = 0; r < this._gameBoard[0].length; r++) {
                if (this._gameBoard[0][r][0] !== null &&
                    this._gameBoard[1][r][1] !== null &&
                    this._gameBoard[2][r][2] !== null &&
                    this._gameBoard[3][r][3] !== null) {

                    if (this._gameBoard[0][r][0] === this._gameBoard[1][r][1] &&
                        this._gameBoard[1][r][1] === this._gameBoard[2][r][2] &&
                        this._gameBoard[2][r][2] === this._gameBoard[3][r][3]) {

                        return true;
                    }
                } else if (this._gameBoard[3][r][0] !== null &&
                    this._gameBoard[2][r][1] !== null &&
                    this._gameBoard[1][r][2] !== null &&
                    this._gameBoard[0][r][3] !== null) {

                    if (this._gameBoard[3][r][0] === this._gameBoard[2][r][1] &&
                        this._gameBoard[2][r][1] === this._gameBoard[1][r][2] &&
                        this._gameBoard[1][r][2] === this._gameBoard[0][r][3]) {

                        return true;
                    }
                }
            }


            return false;
        };

        GameLogicController.prototype._isComplexColoumnStaircaseWin = function() {
            var c;
            var gameBoard = this._gameBoard;

            for (c = 0; c < gameBoard[0].length; c++) {
                if (gameBoard[0][0][c] !== null &&
                    gameBoard[1][1][c] !== null &&
                    gameBoard[2][2][c] !== null &&
                    gameBoard[3][3][c] !== null) {

                    if (gameBoard[0][0][c] === gameBoard[1][1][c] &&
                        gameBoard[1][1][c] === gameBoard[2][2][c] &&
                        gameBoard[2][2][c] === gameBoard[3][3][c]) {

                        return true;
                    }
                } else if (gameBoard[3][0][c] !== null &&
                    gameBoard[2][1][c] !== null &&
                    gameBoard[1][2][c] !== null &&
                    gameBoard[0][3][c] !== null) {

                    if (gameBoard[3][0][c] === gameBoard[2][1][c] &&
                        gameBoard[2][1][c] === gameBoard[1][2][c] &&
                        gameBoard[1][2][c] === gameBoard[0][3][c]) {

                        return true;
                    }
                }
            }


            return false;
        };

        GameLogicController.prototype._isComplexDiagonalWin = function() {
            var gameBoard = this._gameBoard;

            if (gameBoard[0][0][0] !== null &&
                gameBoard[1][1][1] !== null &&
                gameBoard[2][2][2] !== null &&
                gameBoard[3][3][3] !== null) {

                if (gameBoard[0][0][0] === gameBoard[0][0][0] &&
                    gameBoard[1][1][1] === gameBoard[2][2][2] &&
                    gameBoard[2][2][2] === gameBoard[3][3][3]) {

                    return true;
                }
            }

            if (gameBoard[3][3][0] !== null &&
                gameBoard[2][2][1] !== null &&
                gameBoard[1][1][2] !== null &&
                gameBoard[0][0][3] !== null) {

                if (gameBoard[3][3][0] === gameBoard[2][2][1] &&
                    gameBoard[2][2][1] === gameBoard[1][1][2] &&
                    gameBoard[1][1][2] === gameBoard[0][0][3]) {

                    return true;
                }
            }

            if (gameBoard[3][0][0] !== null &&
                gameBoard[2][2][1] !== null &&
                gameBoard[1][1][2] !== null &&
                gameBoard[0][0][3] !== null) {

                if (gameBoard[3][0][0] === gameBoard[2][2][1] &&
                    gameBoard[2][2][1] === gameBoard[1][1][2] &&
                    gameBoard[1][1][2] === gameBoard[0][0][3]) {

                    return true;
                }
            }

            if (gameBoard[3][0][3] !== null &&
                gameBoard[2][1][2] !== null &&
                gameBoard[1][2][1] !== null &&
                gameBoard[0][3][0] !== null) {

                if (gameBoard[3][0][3] === gameBoard[2][1][2] &&
                    gameBoard[2][1][2] === gameBoard[1][2][1] &&
                    gameBoard[1][2][1] === gameBoard[0][3][0]) {

                    return true;
                }
            }

            return false;
        };


        return GameLogicController;
    })();

//* --------------------------------------------------------------------
//* --------------------------------------------------------------------

    /**
     * GameController
     * @constructor
     */
    var GameController = (function() {
        var GAME_BOARD = [
            [
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null]
            ],
            [
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null]
            ],
            [
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null]
            ],
            [
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null]
            ]
        ];

        /**
         * @class GameController
         * @param $element
         * @constructor
         */
        var GameController = function($element, view, gameLogicController) {
            return this._init($element, view, gameLogicController);
        };

        GameController.prototype._init = function($element, view, gameLogicController) {

            this._$element = $element;
            this.gameView = view;
            this.gameLogicController = gameLogicController;

            this._$row = null;
            this._$cell = null;
            this._activePlayer = 0;
            this._moveToMake = {
                level: -1,
                row: -1,
                column: -1
            };

            return this._setupHandlers()
                        ._createChildren()
                        ._enable();
        };

        GameController.prototype._setupHandlers = function() {
            this._onClickHandler = $.proxy(this._onClick, this);

            return this;
        };

        GameController.prototype._createChildren = function() {
            this._$row = this._$element.find('.js-gameBoard-row');
            this._$cell = this._$element.find('.js-gameBoard-row td');

            return this;
        };

        GameController.prototype._enable = function() {
            this._$cell.on('click', this._onClickHandler);

            return this;
        };

        GameController.prototype._disable = function() {
            this._$cell.off('click', this._onClickHandler);

            return this;
        };

        GameController.prototype._destroy = function() {
            this._$element = null;
            this.gameView = null;
            this.gameLogicController = null;
            this._$row = null;
            this._$cell = null;

            return this;
        };


        ////////////////////////////////////////////////////////////////
        /// HELPERS
        ////////////////////////////////////////////////////////////////


        GameController.prototype._onClick = function(event) {
            var $target = $(event.currentTarget);
            this._moveToMake.level = $target.parent().data('levelId');
            this._moveToMake.row = $target.parent().data('rowId');
            this._moveToMake.column = $target.data('cellId');

            return this._willMakeMove($target);
        };

        GameController.prototype._willMakeMove = function($target) {
            if (!this._isValidMove()) {
                alert('Move is invalid, please make a valid move');
                return;
            }

            this._executePlayerMove();

            return this._didMakeMove($target);
        };


        GameController.prototype._didMakeMove = function($target) {
            this.gameView.makePlayerMove(this._activePlayer, $target);

            var isWinner = this.gameLogicController.isWinningMove(GAME_BOARD);
            if (isWinner) {
                alert('Player ' + (this._activePlayer + 1) + ' is a WINNER!!!');

                return;
            }

            this._playerDidMove();

            return this;
        };




        GameController.prototype._isValidMove = function() {
            var level = this._moveToMake.level;
            var row = this._moveToMake.row;
            var column = this._moveToMake.column;

            // is cell empty
            if (GAME_BOARD[level][row][column] !== null) {
                return false;
            }

            // if level > 0, is cell below empty
            if (level > 0) {
                return GAME_BOARD[level -1][row][column] !== null;
            }

            return true;
        };

        GameController.prototype._executePlayerMove = function() {
            var level = this._moveToMake.level;
            var row = this._moveToMake.row;
            var column = this._moveToMake.column;

            GAME_BOARD[level][row][column] = this._activePlayer;

            return this;
        };

        GameController.prototype._playerDidMove = function() {
            if (this._activePlayer === PLAYER.ONE) {
                this._activePlayer = PLAYER.TWO;
                this.gameView.changePlayer(PLAYER.TWO);

            } else {
                this._activePlayer = PLAYER.ONE;
                this.gameView.changePlayer(PLAYER.ONE);
            }

            return this;
        };


        return GameController;
    })();



    var $gameBoard = $('.js-gameBoard');
    var $currentPlayer = $('.js-player');

    var gameView = new GameView($currentPlayer);
    var gameLogicController = new GameLogicController();
    var gameController = new GameController($gameBoard, gameView, gameLogicController);

});