import _compact from 'lodash/compact';
import _filter from 'lodash/filter';
import _map from 'lodash/map';

import GameHistory from './GameHistory';
import FormationCollection from './Formation/FormationCollection';
import { directionsFromPoint } from './directionsFromPoint';

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
     * @method willMove
     * @param player {number}
     * @param point {array}
     * @return {boolean}
     */
    willMove(player, point) {
        if (!this.addPlayerAtPoint) {
            return false;
        }

        return this.didMove(player, point);
    }

    /**
     * @method didMove
     * @param player {number}
     * @param point {array}
     * @return {boolean}
     */
    didMove(player, point) {
        this.addToHistory(player, point);
        const winningFormation = this.findWinningFormation(player, point);

        if (winningFormation !== null) {
            console.log('WINNER', winningFormation);
        }

        return true;
    }

    /**
     * @method addPlayerAtPoint
     * @param player {number}
     * @param point {array}
     * @return {boolean}
     */
    addPlayerAtPoint(player, point) {
        if (!this.isPointWithinGameBoard(point) || !this.isPointAvailable(point)) {
            return false;
        }

        const level = point[0];
        const row = point[1];
        const column = point[2];

        this._gameBoard[level][row][column] = player;

        return true;
    }

    /**
     * @method addToHistory
     * @param player {number}
     * @param point {array}
     */
    addToHistory(player, point) {
        this.gameHistory.addPlayerMoveToHistory(player, point);
    }

    /**
     * @method findWinningFormation
     * @param player {number}
     * @param point {array}
     * @return {FormationModel|null}
     */
    findWinningFormation(player, point) {
        const formations = this.formationCollection.filterFormationsForPoint(point);

        for (let i = 0; i < formations.length; i++) {
            const formation = formations[i];

            if (this.isWinningFormation(player, formation.points)) {
                return formation;
            }
        }

        return null;
    }

    /**
     * @method isWinningFormation
     * @param player {number}
     * @param formationPoints {array}
     * @return {boolean}
     */
    isWinningFormation(player, formationPoints) {
        for (let i = 0; i < formationPoints.length; i++) {
            const point = formationPoints[i];

            if (this.findPlayerForPoint(point) !== player) {
                return false;
            }
        }

        return true;
    }

    /**
     * @method isPointWithinGameBoard
     * @param point {array}
     * @return {boolean}
     */
    isPointWithinGameBoard(point) {
        for (let i = 0; i < point.length; i++) {
            if (point[i] < 0 || point[i] > 3) {
                return false;
            }
        }

        return true;
    }

    /**
     * @method findPlayerForPoint
     * @param point {array}
     * @return {number|null}
     */
    findPlayerForPoint(point) {
        const level = point[0];
        const row = point[1];
        const column = point[2];

        return this._gameBoard[level][row][column];
    }

    /**
     * @method isPointAvailable
     * @param point {array}
     * @return {boolean}
     */
    isPointAvailable(point) {
        return this.findPlayerForPoint(point) === null;
    }

    // //
    // DEPRECATE
    // //

    /**
     * @method findAdjacentValidPointsFromPointForPlayer
     * @param player {number}
     * @param point {array}
     * @return {array}
     */
    findAdjacentValidPointsFromPointForPlayer(player, point) {
        const foundPoints = this.findAdjacentValidPointsFromPoint(point);
        const playerPoints = _filter(foundPoints, (p) => {
            return this.findPlayerForPoint(p) === player;
        });

        return playerPoints;
    }

    /**
     * @method findAdjacentValidPointsFromPoint
     * @param point {array}
     * @return {array}
     */
    findAdjacentValidPointsFromPoint(point) {
        const foundPoints = _map(directionsFromPoint, (d) => {
            const level = point[0] + d[0];
            const row = point[1] + d[1];
            const column = point[2] + d[2];
            const foundPoint = [level, row, column];

            return this.isPointWithinGameBoard(foundPoint)
                ? foundPoint
                : false;
        });

        return _compact(foundPoints);
    }

    /**
     * @method findAdjacentDirectionsFromPoint
     * @param point {array}
     * @return foundDirections {array}
     */
    findAdjacentDirectionsFromPoint(point) {
        const foundDirections = _map(directionsFromPoint, (direction) => {
            const level = point[0] + direction[0];
            const row = point[1] + direction[1];
            const column = point[2] + direction[2];
            const foundPoint = [level, row, column];

            return this.isPointWithinGameBoard(foundPoint)
                ? direction
                : false;
        });

        return _compact(foundDirections);
    }
}
