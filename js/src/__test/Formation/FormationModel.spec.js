import ava from 'ava';

import FormationModel from '../../Formation/FormationModel';

const FORMATION_TYPE = 'ROW_NATURAL';
const POINTS = [
    [0, 0, 0],
    [1, 1, 1],
    [2, 2, 2],
    [3, 3, 3]
];

ava('#FormationModel requires two paramaters type and points', t => {
    t.throws(() => new FormationModel());
    t.throws(() => new FormationModel(''));
    t.notThrows(() => new FormationModel(FORMATION_TYPE, POINTS));
});

ava('#FormationModel sets type and points via the constructor', t => {
    const result = new FormationModel(FORMATION_TYPE, POINTS);

    t.truthy(result.id !== 0);
    t.truthy(result.type === FORMATION_TYPE);
    t.truthy(result.points === POINTS);
});

ava('.isPointWithinFormation() returns a boolean for when a point exists within an instance\'s points array ', t => {
    const model = new FormationModel(FORMATION_TYPE, POINTS);
    const negativeResult = model.isPointWithinFormation([3, 0, 2]);
    const positiveResult = model.isPointWithinFormation([0, 0, 0]);

    t.throws(() => model.isPointWithinFormation());
    t.throws(() => model.isPointWithinFormation({}));
    t.falsy(negativeResult);
    t.truthy(positiveResult);
});
