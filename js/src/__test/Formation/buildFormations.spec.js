import ava from 'ava';

import {
    buildRows,
    buildColumns,
    buildDiagonals,
    buildStacks
} from '../../Formation/buildFormations';

ava('.buildRows() returns a three dimensional array', t => {
    const result = buildRows();

    t.truthy(result.length === 16);
    t.truthy(result[0].length === 4);
    t.truthy(result[0][0].length === 3);
});

ava('.buildRows() with an `ASC` parameter returns a three dimensional array', t => {
    const result = buildRows('ASC');

    t.truthy(result.length === 4);
    t.truthy(result[0].length === 4);
    t.truthy(result[0][0].length === 3);
});

ava('.buildRows() with an `DESC` parameter returns a three dimensional array', t => {
    const result = buildRows('DESC');

    t.truthy(result.length === 4);
    t.truthy(result[0].length === 4);
    t.truthy(result[0][0].length === 3);
});

ava('.buildColumns() returns a three dimensional array', t => {
    const result = buildColumns();

    t.truthy(result.length === 16);
    t.truthy(result[0].length === 4);
    t.truthy(result[0][0].length === 3);
});

ava('.buildColumns() with an `ASC` parameter returns a three dimensional array', t => {
    const result = buildColumns('ASC');

    t.truthy(result.length === 4);
    t.truthy(result[0].length === 4);
    t.truthy(result[0][0].length === 3);
});

ava('.buildColumns() with an `DESC` parameter returns a three dimensional array', t => {
    const result = buildColumns('DESC');

    t.truthy(result.length === 4);
    t.truthy(result[0].length === 4);
    t.truthy(result[0][0].length === 3);
});

ava('.buildDiagonals() with an `NATURAL` parameter returns a three dimensional array', t => {
    const result = buildDiagonals('NATURAL');

    t.truthy(result.length === 8);
    t.truthy(result[0].length === 4);
    t.truthy(result[0][0].length === 3);
});

ava('.buildDiagonals() with an `ASC` parameter returns a three dimensional array', t => {
    const result = buildDiagonals('ASC');

    t.truthy(result.length === 2);
    t.truthy(result[0].length === 4);
    t.truthy(result[0][0].length === 3);
});

ava('.buildDiagonals() with an `DESC` parameter returns a three dimensional array', t => {
    const result = buildDiagonals('DESC');

    t.truthy(result.length === 2);
    t.truthy(result[0].length === 4);
    t.truthy(result[0][0].length === 3);
});

ava('.buildStacks() returns a three dimensional array', t => {
    const result = buildStacks();

    t.truthy(result.length === 16);
    t.truthy(result[0].length === 4);
    t.truthy(result[0][0].length === 3);
});
