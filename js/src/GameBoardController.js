import GameHistory from './GameHistory';
import FormationPointModel from './Formation/FormationPointModel';
import FormationCollection from './Formation/FormationCollection';

/**
 * Unique id for the controller. Should only be useful for testing, as there should only really be one
 * controller instanciated at a time.
 *
 * @property ID
 * @type {number}
 * @default 0
 */
let ID = 0;

/**
 * @class GameBoardController
 */
export default class GameBoardController {
    /**
     * @for GameBoardController
     * @constructor
     */
    constructor() {
        this._id = ID++;
        this.formationCollection = new FormationCollection();
        this.gameHistory = new GameHistory();
        this._gameBoard = [
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
    }

    /**
     * @for GameBoardController
     * @method findPlayerForPoint
     * @param point {FormationPointModel}
     * @return {number|null}
     */
    findPlayerForPoint(point) {
        const level = point.level;
        const row = point.row;
        const column = point.column;

        return this._gameBoard[level][row][column];
    }

    /**
     * @for GameBoardController
     * @method isPointAvailable
     * @param point {array}
     * @return {boolean}
     */
    isPointAvailable(point) {
        return this.findPlayerForPoint(point) === null;
    }

    /**
     * @for GameBoardController
     * @method isValidMove
     * @param point {FormationPointModel}
     * @return {boolean}
     */
    isValidMove(point) {
        if (point.level === 0) {
            return this.isPointAvailable(point);
        }

        const level = point.level - 1;
        const row = point.row;
        const column = point.column;

        return this.isPointAvailable(point) && this._gameBoard[level][row][column] !== null;
    }

    /**
     * @for GameBoardController
     * @method addPlayerAtPoint
     * @param player {number}
     * @param point {FormationPointModel}
     * @return {boolean}
     */
    addPlayerAtPoint(player, point) {
        if (!this.isValidMove(point)) {
            return false;
        }

        const level = point.level;
        const row = point.row;
        const column = point.column;

        this._gameBoard[level][row][column] = player;

        return true;
    }

    /**
     * @for GameBoardController
     * @method addToHistory
     * @param player {number}
     * @param point {array}
     */
    addToHistory(player, point) {
        this.gameHistory.addPlayerMoveToHistory(player, point);
    }

    /**
     * @for GameBoardController
     * @method findWinningFormation
     * @param player {number}
     * @param point {array}
     * @return {FormationModel|null}
     */
    findWinningFormation(player, point) {
        console.log(this.gameHistory);
        if (this.gameHistory.length < 7) {
            return null;
        }

        const formations = this.formationCollection.filterFormationsForPoint(point);

        for (let i = 0; i < formations.length; i++) {
            const formation = formations[i];

            if (this.isWinningFormation(player, formation.points)) {
                this.gameHistory.reportGameHistory();
                return formation;
            }
        }

        return null;
    }

    /**
     * @for GameBoardController
     * @method isWinningFormation
     * @param player {number}
     * @param formationPoints {array}
     * @return {boolean}
     */
    isWinningFormation(player, formationPoints) {
        debugger;
        for (let i = 0; i < formationPoints.length; i++) {
            const point = formationPoints[i];

            if (this.findPlayerForPoint(point) !== player) {
                return false;
            }
        }

        return true;
    }
}
