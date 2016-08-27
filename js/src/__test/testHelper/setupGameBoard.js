import _pullAt from 'lodash/pullAt';
import _remove from 'lodash/remove';

import GameBoard from './gameBoardMock';

const IS_COLUMN = true;
const IS_ASCENDING = true;
const IS_DESCENDING = true;
const GAME_BOARD_SIZE = 4;

/**
 * generate random integer between min and max.
 *
 * used to generate a random index number.
 *
 * @method randomInteger
 * @param  {number}      [min=0]
 * @param  {number}      [max=3]
 * @return {number}
 */
const randomInteger = (min = 0, max = 3) => {
    const r = Math.random();

    return Math.floor(r * (((max - min) + 1) + min));
};

const isCloserToThree = (n) => {
    const diffrenceFromZero = Math.floor(n);
    const differenceFromThree = 3 - Math.floor(n);

    return differenceFromThree < diffrenceFromZero;
};

/**
 * Creates a game board that includes the list of movesToPlace.
 *
 * Provides a programatic way to prepare a game board for specific game situations that can be used for test.
 * IE: setup game board for specific wining formations, etc.
 *
 * @function setupGameBoard
 * @param movesToPlace {array[array]}
 * @param player {number}
 * @return {array[array[array[number]]]}
 */
export const setupGameBoard = (movesToPlace = [], player = 0) => {
    const gameBoard = GameBoard.slice(0);

    if (movesToPlace.length === 0) {
        return GameBoard;
    }

    for (let i = 0; i < movesToPlace.length; i++) {
        const m = movesToPlace[i];

        const level = m[0];
        const row = m[1];
        const cell = m[2];

        gameBoard[level][row][cell] = player;
    }

    return gameBoard;
};


const rowOrColumn = (isColumn = false) => {
    const level = randomInteger();
    const columnOrRowIndex = randomInteger();
    const lastMoveIndex = randomInteger();

    let previousPlays = [];
    for (let i = 0; i < GAME_BOARD_SIZE; i++) {
        if (isColumn) {
            previousPlays.push([level, i, columnOrRowIndex]);
        } else {
            previousPlays.push([level, columnOrRowIndex, i]);
        }
    }

    const lastMove = _pullAt(previousPlays.slice(0), lastMoveIndex)[0];
    previousPlays = _remove(previousPlays, (v, i) => i !== lastMoveIndex);

    return {
        gameBoard: setupGameBoard(previousPlays),
        lastMove
    };
};

export const row = () => rowOrColumn();
export const column = () => rowOrColumn(IS_COLUMN);

export const stack = () => {
    const row = randomInteger();
    const cell = randomInteger();
    const lastMoveIndex = 3;

    const previousPlays = [];
    for (let i = 0; i < lastMoveIndex; i++) {
        previousPlays.push([i, row, cell]);
    }

    const lastMove = [lastMoveIndex, row, cell];

    return {
        gameBoard: setupGameBoard(previousPlays),
        lastMove
    };
};

// [0, 0, 0], [1, 1, 1], [2, 2, 2], [3, 3, 3]
// [0, 0, 3], [1, 1, 2], [2, 2, 1], [3, 3, 0]
const ascendingStaircase = (isColumn = false) => {
    const columnOrRowIndex = randomInteger();
    const lastMoveIndex = randomInteger();

    const previousPlays = [];
    for (let i = 0; i < GAME_BOARD_SIZE; i++) {
        if (i !== lastMoveIndex) {
            continue;
        }

        if (isColumn && !isCorner) {
            previousPlays.push([i, i, columnOrRowIndex]);
        } else {
            previousPlays.push([i, columnOrRowIndex, i]);
        }
    }

    const lastMove = isColumn
        ? [lastMoveIndex, lastMoveIndex, columnOrRowIndex]
        : [lastMoveIndex, columnOrRowIndex, lastMoveIndex];

    return {
        gameBoard: setupGameBoard(previousPlays),
        lastMove
    };
};

export const ascendingStaircaseRow = () => ascendingStaircase();
export const ascendingStaircaseColumn = () => ascendingStaircase(IS_COLUMN);

const descendingStaircase = (isColumn = false) => {
    let levelIndexForMove;
    let level = 3;
    const columnOrRowIndex = randomInteger();
    const lastMoveIndex = randomInteger();

    const previousPlays = [];
    for (let i = 0; i < GAME_BOARD_SIZE; i++) {
        if (i === lastMoveIndex) {
            levelIndexForMove = level;
            level--;

            continue;
        }

        if (isColumn) {
            previousPlays.push([level, i, columnOrRowIndex]);
        } else {
            previousPlays.push([level, columnOrRowIndex, i]);
        }

        level--;
    }

    const lastMove = isColumn
        ? [levelIndexForMove, lastMoveIndex, columnOrRowIndex]
        : [levelIndexForMove, columnOrRowIndex, lastMoveIndex];

    return {
        gameBoard: setupGameBoard(previousPlays),
        lastMove
    };
};

export const descendingStaircaseRow = () => descendingStaircase();
export const descendingStaircaseColumn = () => descendingStaircase(IS_COLUMN);

// [0, 0, 0], [0, 1, 1], [0, 2, 2], [0, 3, 3]
// [0, 3, 0], [0, 2, 1], [0, 1, 2], [0, 0, 3]
//
// ascending
// [0, 0, 0], [1, 1, 1], [2, 2, 2], [3, 3, 3]
// [0, 3, 0], [1, 2, 1], [2, 1, 2], [3, 0, 3]
//
// descending
// [3, 0, 0], [2, 1, 1], [1, 2, 2], [0, 3, 3]
// [3, 3, 0], [2, 2, 1], [1, 1, 2], [0, 0, 3]
const corner = (isAscending = false, isDescending = false) => {
    const level = randomInteger();
    const lastMoveIndex = randomInteger();
    // randomly choose either 0 or three
    const bottomCornerCell = isCloserToThree(randomInteger()) ? 3 : 0;

    let previousPlays = [];
    if (bottomCornerCell) {
        let decrementor = 3;
        for (let i = 0; i < GAME_BOARD_SIZE; i++) {
            previousPlays.push([level, i, decrementor]);

            decrementor--;
        }
    } else {
        for (let i = 0; i < GAME_BOARD_SIZE; i++) {
            previousPlays.push([level, i, i]);
        }
    }

    if (isAscending) {
        for (let i = 0; i < previousPlays.length; i++) {
            previousPlays[i][0] = i;
        }
    } else if (isDescending) {
        let decrementor = 3;
        for (let i = 0; i < previousPlays.length; i++) {
            previousPlays[i][0] = decrementor;

            decrementor--;
        }
    }

    const lastMove = _pullAt(previousPlays.slice(0), lastMoveIndex)[0];
    previousPlays = _remove(previousPlays, (v, i) => i !== lastMoveIndex);

    return {
        gameBoard: setupGameBoard(previousPlays),
        lastMove
    };
};

export const diagonalCorner = () => corner();
export const ascendingCorner = () => corner(IS_ASCENDING);
export const descendingCorner = () => corner(false, IS_DESCENDING);
