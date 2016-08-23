import ava from 'ava';
import {
    row,
    column,
    stack,
    ascendingStaircaseRow,
    ascendingStaircaseColumn,
    descendingStaircaseRow,
    descendingStaircaseColumn,
    diagonalCorner,
    ascendingCorner,
    descendingCorner
} from './testHelper/setupGameBoard';

import VictoryController from '../VitcoryController';


ava('VictoryController instantiates without any paramaters', t => {
    t.notThrows(() => new VictoryController());
});

// ava('.IsWinningMove() accepts three params; currentGameBoard, lastMove, currentPlayer', t => {
//     const victoryController = new VictoryController();
//
//     const result = victoryController.isWinningMove(setupGameBoard(), [0, 0, 0], 0);
// });
