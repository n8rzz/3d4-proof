/* eslint no-underscore-dangle: 0 */
import ava from 'ava';
import sinon from 'sinon';
import _isArray from 'lodash/isArray';
import _isEqual from 'lodash/isEqual';

import GameBoardController from '../GameBoardController';
// import {
//     row,
//     column,
//     stack,
//     ascendingStaircaseRow,
//     ascendingStaircaseColumn,
//     descendingStaircaseRow,
//     descendingStaircaseColumn,
//     diagonalCorner,
//     ascendingCorner,
//     descendingCorner
// } from './testHelper/setupGameBoard';

import {
    PLAYER_ONE,
    PLAYER_TWO,
    VALID_POINT_FIRST_LEVEL,
    VALID_POINT_SECOND_LEVEL,
    INVALID_POINT
} from './testHelper/mocks';

// Utility to setup a gameBoardController instance with a specific gameBoard shape
const setupGameBoardTestCase = (pointsToPlace = [], player = null) => {
    const gameBoard = new GameBoardController();

    for (let i = 0; i < pointsToPlace.length; i++) {
        const point = pointsToPlace[i];
        gameBoard.addPlayerAtPoint(player, point);
    }

    return gameBoard;
};

ava('GameBoardController instantiates without any paramaters', t => {
    const gameBoard = new GameBoardController();

    t.notThrows(() => new GameBoardController());
    t.truthy(_isArray(gameBoard._gameBoard));
});

// ava('.willMove() ', t => {
//     const gameBoard = new GameBoardController();
//     const result = gameBoard.willMove(PLAYER_ONE, VALID_POINT_FIRST_LEVEL);
//
//     // t.truthy();
// });

ava('.didMove() returns a boolean', t => {
    const gameBoard = new GameBoardController();
    const result = gameBoard.didMove(PLAYER_ONE, VALID_POINT_FIRST_LEVEL);

    t.truthy(result);
});

ava('.addPlayerAtPoint() returns a boolean and adds point to gameBoard', t => {
    const gameBoard = new GameBoardController();

    t.falsy(gameBoard.addPlayerAtPoint(PLAYER_ONE, INVALID_POINT));
    t.truthy(gameBoard.addPlayerAtPoint(PLAYER_ONE, VALID_POINT_FIRST_LEVEL));
});

ava('.addPlayerAtPoint() calls .isPointWithinGameBoard() before adding a new point', t => {
    const gameBoard = new GameBoardController();
    const isPointWithinGameBoardSpy = sinon.spy(gameBoard, 'isPointWithinGameBoard');

    gameBoard.addPlayerAtPoint(PLAYER_ONE, VALID_POINT_FIRST_LEVEL);
    t.truthy(isPointWithinGameBoardSpy.calledOnce);
});

ava('.addPlayerAtPoint() calls .isPointAvailable() before adding a new point', t => {
    const gameBoard = new GameBoardController();
    const isPointAvailableSpy = sinon.spy(gameBoard, 'isPointAvailable');

    gameBoard.addPlayerAtPoint(PLAYER_ONE, VALID_POINT_FIRST_LEVEL);
    t.truthy(isPointAvailableSpy.calledOnce);
});

// ava('.addToHistory() ', t => {
//     const gameBoard = new GameBoardController();
// });

ava('.findWinningFormation() ', t => {
    const existingPlayerPoints = [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 2],
        [0, 1, 3]
    ];
    const gameBoard = setupGameBoardTestCase(existingPlayerPoints, PLAYER_ONE);
    const result = gameBoard.findWinningFormation(PLAYER_ONE, [0, 1, 3]);

    t.truthy(result.type === 'ROW_NATURAL');
});

// ava('.isWinningFormation()', t => {
//
// });

ava('.isPointWithinGameBoard() returns a boolean for if a point is within the gameBoard', t => {
    const gameBoard = new GameBoardController();

    t.falsy(gameBoard.isPointWithinGameBoard(INVALID_POINT));
    t.truthy(gameBoard.isPointWithinGameBoard(VALID_POINT_FIRST_LEVEL));
});

ava('.findPlayerForPoint() returns a player number or null for a point', t => {
    const existingPlayerPoints = [[0, 0, 0]];
    const gameBoard = setupGameBoardTestCase(existingPlayerPoints, PLAYER_ONE);
    const result = gameBoard.findPlayerForPoint(VALID_POINT_FIRST_LEVEL);

    t.falsy(result === null);
    t.truthy(result === PLAYER_ONE);
});

ava('.isPointAvailable() returns a boolean for if a point is taken by another players move', t => {
    const existingPlayerPoints = [[0, 0, 0]];
    const gameBoard = setupGameBoardTestCase(existingPlayerPoints, PLAYER_ONE);

    t.falsy(gameBoard.isPointAvailable(VALID_POINT_FIRST_LEVEL));
    t.truthy(gameBoard.isPointAvailable(VALID_POINT_SECOND_LEVEL));
});

ava('.findAdjacentValidPointsFromPointForPlayer() returns a list of gameBoard positions for a player adjacent to a point', t => {
    const startingPoint = [1, 2, 0];
    const existingPlayerPoints = [
        [1, 1, 0],
        [1, 2, 1],
        [1, 3, 1]
    ];

    const gameBoard = setupGameBoardTestCase(existingPlayerPoints, PLAYER_ONE);
    const result = gameBoard.findAdjacentValidPointsFromPointForPlayer(PLAYER_ONE, startingPoint);

    t.truthy(_isEqual(existingPlayerPoints[0], result[0]));
    t.truthy(_isEqual(existingPlayerPoints[1], result[1]));
    t.truthy(_isEqual(existingPlayerPoints[2], result[2]));
});

ava('.findAdjacentValidPointsFromPointForPlayer() calls .isPointWithinGameBoard() to verify each adjacent point', t => {
    const startingPoint = [1, 2, 0];
    const existingPlayerPoints = [
        [1, 1, 0],
        [1, 2, 1],
        [1, 3, 1]
    ];

    const gameBoard = setupGameBoardTestCase(existingPlayerPoints, PLAYER_ONE);
    const isPointWithinGameBoardSpy = sinon.spy(gameBoard, 'isPointWithinGameBoard');

    gameBoard.findAdjacentValidPointsFromPointForPlayer(PLAYER_ONE, startingPoint);
    t.truthy(isPointWithinGameBoardSpy.called);
});

ava('.findAdjacentValidPointsFromPointForPlayer() calls .findPlayerForPoint() to verify each adjacent point', t => {
    const startingPoint = [1, 2, 0];
    const existingPlayerPoints = [
        [1, 1, 0],
        [1, 2, 1],
        [1, 3, 1]
    ];

    const gameBoard = setupGameBoardTestCase(existingPlayerPoints, PLAYER_ONE);
    const findPlayerForPointSpy = sinon.spy(gameBoard, 'findPlayerForPoint');

    gameBoard.findAdjacentValidPointsFromPointForPlayer(PLAYER_ONE, startingPoint);
    t.truthy(findPlayerForPointSpy.called);
});

ava('.findAdjacentValidPointsFromPoint() returns an array', t => {
    const startingPoint = [1, 2, 0];
    const existingPlayerPoints = [
        [1, 1, 0],
        [1, 2, 1],
        [1, 3, 1]
    ];

    const gameBoard = setupGameBoardTestCase(existingPlayerPoints, PLAYER_ONE);
    const result = gameBoard.findAdjacentValidPointsFromPoint(startingPoint);

    t.truthy(_isArray(result));
});

ava('.findAdjacentDirectionsFromPoint() returns an array of valid directions from a point', t => {
    const point = [0, 0, 0];
    const gameBoard = new GameBoardController();
    const result = gameBoard.findAdjacentDirectionsFromPoint(point);

    t.truthy(result.length === 7);
});
