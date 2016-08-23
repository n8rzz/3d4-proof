import _compact from 'lodash/compact';
import _filter from 'lodash/filter';
import _map from 'lodash/map';

import GameHistory from './GameHistory';
import FormationCalculator from './FormationCalculator';
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
        GameHistory.addPlayerMoveToHistory(player, point);

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

    calculatePossibleWinFormations(point) {
        // findAdjacentDirectionsFromPoint
        // 
        //
    }
}
