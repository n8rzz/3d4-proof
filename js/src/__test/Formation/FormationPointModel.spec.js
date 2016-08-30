import ava from 'ava';

import FormationPointModel from '../../Formation/FormationPointModel';

const SINGLE_POINT = new FormationPointModel(1, 2, 3);
const FALSY_COMPARE_POINT = new FormationPointModel(3, 2, 1);
const LEVEL = SINGLE_POINT.level;
const ROW = SINGLE_POINT.row;
const COLUMN = SINGLE_POINT.column;

ava('#FormationPointModel instantiates with three parameters level, row and column', t => {
    t.throws(() => new FormationPointModel());
    t.notThrows(() => new FormationPointModel(LEVEL, ROW, COLUMN));
});

ava('.isEqualToComparePoint() returns a boolean', t => {
    const model = new FormationPointModel(LEVEL, ROW, COLUMN);
    const negativeResult = model.isEqualToComparePoint(FALSY_COMPARE_POINT);
    const positiveResult = model.isEqualToComparePoint(SINGLE_POINT);

    t.falsy(negativeResult);
    t.truthy(positiveResult);
});

ava('.toArray() returns a single array with a length of 3', t => {
    const model = new FormationPointModel(LEVEL, ROW, COLUMN);
    const result = model.toArray();

    t.truthy(LEVEL === result[0]);
    t.truthy(ROW === result[1]);
    t.truthy(COLUMN === result[2]);
});
