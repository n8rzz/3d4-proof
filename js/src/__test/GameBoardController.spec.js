/* eslint no-underscore-dangle: 0 */
import ava from 'ava';
import sinon from 'sinon';
import _isArray from 'lodash/isArray';

import FormationPointModel from '../Formation/FormationPointModel';
import GameBoardController from '../GameBoardController';

import {
    PLAYER_ONE,
    VALID_POINT_FIRST_LEVEL,
    VALID_POINT_SECOND_LEVEL,
    INVALID_POINT
} from './testHelper/mocks';

// Utility to setup a gameBoardController instance with a specific gameBoard shape
const setupGameBoardTestCase = (pointsToPlace = [], player = null) => {
    const gameBoard = new GameBoardController();

    for (let i = 0; i < pointsToPlace.length; i++) {
        const point = new FormationPointModel(pointsToPlace[i][0], pointsToPlace[i][1], pointsToPlace[i][2]);
        gameBoard.addPlayerAtPoint(player, point);
    }

    return gameBoard;
};

ava('GameBoardController instantiates without any paramaters', t => {
    const gameBoard = new GameBoardController();

    t.notThrows(() => new GameBoardController());
    t.truthy(_isArray(gameBoard._gameBoard));
});

ava('.addPlayerAtPoint() returns a boolean and adds point to gameBoard', t => {
    const gameBoard = new GameBoardController();

    t.throws(() => gameBoard.addPlayerAtPoint(PLAYER_ONE, INVALID_POINT));
    t.truthy(gameBoard.addPlayerAtPoint(PLAYER_ONE, VALID_POINT_FIRST_LEVEL));
});

ava('.addPlayerAtPoint() calls .isValidMove() before adding a new point', t => {
    const gameBoard = new GameBoardController();
    const isValidMoveSpy = sinon.spy(gameBoard, 'isValidMove');

    gameBoard.addPlayerAtPoint(PLAYER_ONE, VALID_POINT_FIRST_LEVEL);
    t.truthy(isValidMoveSpy.calledOnce);
});

// ava('.addToHistory() ', t => {
//     const gameBoard = new GameBoardController();
// });

ava('.findWinningFormation() returns early if there are less than 7 points played', t => {
    const gameBoard = setupGameBoardTestCase([[0, 0, 0], [0, 2, 0]], PLAYER_ONE);
    const lastMove = new FormationPointModel(0, 1, 3);
    const result = gameBoard.findWinningFormation(PLAYER_ONE, lastMove);

    t.truthy(result === null);
});

// ava('.findWinningFormation() ', t => {
//     const existingPlayerPoints = [
//         [0, 0, 0],
//         [0, 0, 1],
//         [0, 0, 2],
//         [0, 0, 3]
//         [0, 1, 0],
//         [0, 1, 1],
//         [0, 1, 2],
//         [0, 1, 3]
//     ];
//     const gameBoard = setupGameBoardTestCase(existingPlayerPoints, PLAYER_ONE);
//     const result = gameBoard.findWinningFormation(PLAYER_ONE, [0, 1, 3]);
//
//     t.truthy(result.type === 'ROW_NATURAL');
// });

// ava('.isWinningFormation()', t => {
//
// });

ava('.isPointAvailable() returns a boolean for if a point is taken by another players move', t => {
    const existingPlayerPoints = [[0, 0, 0]];
    const gameBoard = setupGameBoardTestCase(existingPlayerPoints, PLAYER_ONE);

    t.falsy(gameBoard.isPointAvailable(VALID_POINT_FIRST_LEVEL));
    t.truthy(gameBoard.isPointAvailable(VALID_POINT_SECOND_LEVEL));
});

ava('.isValidMove() returns a boolean for if a point is available to place a new move', t => {
    const existingPlayerPoints = [[0, 0, 0]];
    const gameBoard = setupGameBoardTestCase(existingPlayerPoints, PLAYER_ONE);

    t.falsy(gameBoard.isValidMove(VALID_POINT_FIRST_LEVEL));
    t.truthy(gameBoard.isValidMove(VALID_POINT_SECOND_LEVEL));
});

ava('.findPlayerForPoint() returns a player number or null for a point', t => {
    const existingPlayerPoints = [[0, 0, 0]];
    const gameBoard = setupGameBoardTestCase(existingPlayerPoints, PLAYER_ONE);
    const result = gameBoard.findPlayerForPoint(VALID_POINT_FIRST_LEVEL);

    t.falsy(result === null);
    t.truthy(result === PLAYER_ONE);
});
