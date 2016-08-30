import ava from 'ava';

import FormationPointModel from '../../Formation/FormationPointModel';

const SINGLE_POINT = [1, 2, 3]
const LEVEL = SINGLE_POINT[0];
const ROW = SINGLE_POINT[1];
const COLUMN = SINGLE_POINT[2];

ava('#FormationPointModel instantiates with three parameters level, row and column', t => {
    t.throws(() => new FormationPointModel());
    t.notThrows(() => new FormationPointModel(LEVEL, ROW, COLUMN));
});

ava('.toArray() returns a single array with a length of 3', t => {
    const model = new FormationPointModel(LEVEL, ROW, COLUMN);
    const result = model.toArray();

    t.truthy(SINGLE_POINT[0] === result[0]);
    t.truthy(SINGLE_POINT[1] === result[1]);
    t.truthy(SINGLE_POINT[2] === result[2]);
});
