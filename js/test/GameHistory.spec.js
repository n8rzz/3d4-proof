import ava from 'ava';

import GameHistory from '../GameHistory';

import {
    PLAYER_ONE,
    PLAYER_TWO,
    VALID_POINT_FIRST_LEVEL,
    VALID_POINT_SECOND_LEVEL
} from './testHelper/mocks';

/**
 * The GameHistory class is exported as `new GameHistory()`
 *
 * This means we are only ever testing a single instance of this class. Thus, cleaning up test cases is extremely
 * important so as not to introduce inconsistencies between test cases.
 */

ava('GameHistory exports an instantiated class', t => {
    t.notThrows(() => GameHistory);
    t.throws(() => new GameHistory());
});

ava('.addPlayerMoveToHistory() accepts player and point as paramaters', t => {
    t.notThrows(() => GameHistory.addPlayerMoveToHistory(PLAYER_ONE, VALID_POINT_FIRST_LEVEL));

    GameHistory._history[PLAYER_ONE] = [];
});

ava('.addPlayerMoveToHistory() adds a move to the history', t => {
    GameHistory.addPlayerMoveToHistory(PLAYER_ONE, VALID_POINT_FIRST_LEVEL);
    GameHistory.addPlayerMoveToHistory(PLAYER_TWO, VALID_POINT_SECOND_LEVEL);

    t.truthy(GameHistory._history[PLAYER_ONE].length === 1);
    t.truthy(GameHistory._history[PLAYER_TWO].length === 1);
});
