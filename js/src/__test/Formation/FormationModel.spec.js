import ava from 'ava';

import FormationPointModel from '../../Formation/FormationPointModel';
import FormationModel from '../../Formation/FormationModel';

const FORMATION_TYPE = 'ROW_NATURAL';
const POINTS = [
    new FormationPointModel(0, 0, 0),
    new FormationPointModel(1, 1, 1),
    new FormationPointModel(2, 2, 2),
    new FormationPointModel(3, 3, 3)
];
const POINT_WITHIN_FORMATION = new FormationPointModel(0, 0, 0);
const POINT_OUTSIDE_FORMATION = new FormationPointModel(3, 0, 2);

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
    const negativeResult = model.isPointWithinFormation(POINT_OUTSIDE_FORMATION);
    const positiveResult = model.isPointWithinFormation(POINT_WITHIN_FORMATION);

    t.falsy(negativeResult);
    t.truthy(positiveResult);
});
