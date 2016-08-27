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
     * @class GameLogicVectorController
     * @constructor
     */
    var GameLogicVectorController = (function() {
        /**
         * Each value represents a direction away from a point located in 3d space.  The values
         *  are arbitrary, signaling only a positive or negative direction of travel.
         *
         * TODO: there is probably a mathmatical way to do some of this other than listing
         *  each direction and needing to use two seperate matching arrays
         *
         * @property VECTOR_FROM_POINT
         * @type {array|array}
         * @requires VECTOR_INVERSE
         * @final
         * @static
         */
        var VECTOR_FROM_POINT = [
            //top left
            [0, -1, -1],
            //top
            [0, -1, 0],
            //top right
            [0, -1, 1],
            //right
            [0, 0, 1],
            //bottom right
            [0, 1, 1],
            //bottom
            [0, 1, 0],
            //bottom left
            [0, 1, -1],
            //left
            [0, 0, -1],


            //ascending
            [1, 0, 0],
            //descending
            [-1, 0, 0],


            //descending top left
            [-1, -1, -1],
            //descending top
            [-1, -1, 0],
            //descending top, right
            [-1, -1, 1],
            //descending right
            [-1, 0, 1],

            //descending bottom, right
            [-1, 1, 1],
            //descending bottom
            [-1, 1, 0],
            //descending bottom, left
            [-1, 1, -1],
            //descending left
            [-1, 0, -1],


            //ascending top left
            [1, -1, -1],
            //ascending top
            [1, -1, 0],
            //ascending top, right
            [1, -1, 1],
            //ascending right

            [1, 0, 1],
            //ascending bottom, right
            [1, 1, 1],
            //ascending bottom
            [1, 1, 0],
            //ascending bottom, left
            [1, 1, -1],
            //ascending left
            [1, 0, -1],
        ];

        var GameLogicVectorController = function() {
            return this._init();
        };

        /**
         * @method _init
         * @for GameLogicVectorController
         */
        GameLogicVectorController.prototype._init = function() {
            this._gameBoard = [];
            this._player = -1;
            this._maxPosition = -1;

            this._lastMove = null;
            this._initialPoint = null;
            this._comparePoint = null;
            this._willCheckInverse = true;
            this._moveCounter = 0;

            return this;
        };

        /**
         * Public facing method that starts off the Vector checks
         *
         * @method isWinningMove
         * @for GameLogicVectorController
         * @returns {boolean}
         */
        GameLogicVectorController.prototype.isWinningMove = function(gameBoard, lastMove, activePlayer) {
            this._gameBoard = gameBoard;
            this._maxPosition = this._gameBoard.length - 1;
            this._player = activePlayer;
            this._lastMove = lastMove;

            return this._isWinningMove();
        };

        /**
         * Loops through each available direction in the VECTORS_FROM_POINT array trying to match
         * a point that contains the same player.  If a match is found, a new check is performed at
         * the matching point and continues in the same direction
         *
         * @method _isWinningMethod
         * @for GameLogicVectorController
         * @returns {boolean}
         */
        GameLogicVectorController.prototype._isWinningMove = function() {
            var i;
            var vector;

            for (i = 0; i < VECTOR_FROM_POINT.length; i++) {
                vector = VECTOR_FROM_POINT[i];

                this._moveCounter = 0;
                this._willCheckInverse = true;
                this._getNextPointAlongVector(vector, this._lastMove.slice(0), false);

                if (!this._isPointValid()) {
                    continue;
                }

                var playerAtPosition = this._getPlayerAtPoint(this._comparePoint);


                // TODO: this is ugly and could probably be done a better way
                // TODO: recursion may be the way to go here, functional programming
                //  but be mindful of portability to C#
                while (playerAtPosition === this._player) {
                    this._moveCounter++;
                    playerAtPosition = -1;

                    if (this._moveCounter === this._maxPosition) {
                        console.log('score 4');
                        return true;
                    }


                    this._getNextPointAlongVector(vector, this._comparePoint, false);


                    if (!this._isPointValid() && this._willCheckInverse) {
                        this._getInverseVector(vector, this._lastMove);
                    }

                    if (!this._isPointValid() && !this._willCheckInverse) {
                        break;
                    }


                    playerAtPosition = this._getPlayerAtPoint(this._comparePoint);
                }
            }


            return false;
        };

        /**
         * Finds coordinates for a neighboring point along a vector given a starting point
         *
         * @method _getNextPointAlongVector
         * @for GameLogicVectorController
         * @param vector {array|number} mathmatical direction to a next point from point
         * @param point {array|number}
         */
        GameLogicVectorController.prototype._getNextPointAlongVector = function(vector, point) {
            this._comparePoint = [];

            this._comparePoint = [
                (point[0] + vector[0]),
                (point[1] + vector[1]),
                (point[2] + vector[2])
            ];
        };

        /**
         * Calculates an opposite vector given the current vector direction.
         *
         * @method _getInverseVector
         * @for GameLogicVectorController
         * @param vector {array} direction away from point
         * @param point {array|number}
         */
        GameLogicVectorController.prototype._getInverseVector = function(vector, point) {
            var j;
            var oppositeVector = [];

            for (j = 0; j < vector.length; j++) {
                oppositeVector[j] = vector[j] * -1;
            }

            this._willCheckInverse = false;
            this._getNextPointAlongVector(oppositeVector, point);
        };

        /**
         * Checks if _comparePoint is out of bounds and returns false if it is
         *
         * @method _isPointValid
         * @for GameLogicVectorController
         * @return {boolean}
         */
        GameLogicVectorController.prototype._isPointValid = function() {
            var i;

            for (i = 0; i < this._comparePoint.length; i++) {
                if (this._comparePoint[i] < 0 || this._comparePoint[i] > this._maxPosition) {
                    return false;
                }
            }

            return true;
        };

        /**
         * Returns a player number given an array on the game board [level, row, cell]
         *
         * @method _getPlayerAtPoint
         * @for GameLogicVectorController
         * @param point {array} a point on the game board
         * @requires {number} player number
         */
        GameLogicVectorController.prototype._getPlayerAtPoint = function(point) {
            var level = point[0];
            var row = point[1];
            var cell = point[2];

            return this._gameBoard[level][row][cell];
        };


        return GameLogicVectorController;
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
        var GameController = function($element, view, gameLogicVectorController) {
            return this._init($element, view, gameLogicVectorController);
        };

        GameController.prototype._init = function($element, view, gameLogicVectorController) {

            this._$element = $element;
            this.gameView = view;
            this.gameLogicVectorController = gameLogicVectorController;

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
            this.gameLogicVectorController = null;
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
            var madeMove = [];
            madeMove[0] = this._moveToMake.level;
            madeMove[1] = this._moveToMake.row;
            madeMove[2] = this._moveToMake.column;

            var isWinner = this.gameLogicVectorController.isWinningMove(GAME_BOARD, madeMove, this._activePlayer);
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
    var gameLogicVectorController = new GameLogicVectorController();
    var gameController = new GameController($gameBoard, gameView, gameLogicVectorController);

});
