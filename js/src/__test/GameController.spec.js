import ava from 'ava';

import GameController from '../GameController';

ava('#GameController instantiates with three parameters', t => {
    t.throws(() => new GameController());
});
