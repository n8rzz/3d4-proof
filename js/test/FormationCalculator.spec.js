import ava from 'ava';

import FormationCalculator from '../FormationCalculator';

ava('FormationCalculator exports an instantiated class', t => {
    t.notThrows(() => FormationCalculator);
    t.throws(() => new FormationCalculator());
});
