import ava from 'ava';

import GameHistory from '../GameHistory';

import {
    PLAYER_ONE,
    PLAYER_TWO,
    VALID_POINT_FIRST_LEVEL,
    VALID_POINT_SECOND_LEVEL
} from './testHelper/mocks';

ava('GameHistory exports an instantiated class', t => {
    t.notThrows(() => new GameHistory());
});

ava('.addPlayerMoveToHistory() accepts player and point as paramaters', t => {
    const gameHistory = new GameHistory();

    t.notThrows(() => gameHistory.addPlayerMoveToHistory(PLAYER_ONE, VALID_POINT_FIRST_LEVEL));
});

ava('.addPlayerMoveToHistory() adds a move to the history', t => {
    const gameHistory = new GameHistory();

    gameHistory.addPlayerMoveToHistory(PLAYER_ONE, VALID_POINT_FIRST_LEVEL);
    gameHistory.addPlayerMoveToHistory(PLAYER_TWO, VALID_POINT_SECOND_LEVEL);

    t.truthy(gameHistory.history[PLAYER_ONE].length === 1);
    t.truthy(gameHistory.history[PLAYER_TWO].length === 1);
});
