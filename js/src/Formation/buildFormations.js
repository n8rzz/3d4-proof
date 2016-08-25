const MAX_LENGTH = 4;

export const FORMATION_DIRECTIONS = {
    NATURAL: 'NATURAL',
    ASC: 'ASC',
    DESC: 'DESC'
};

/**
 * @function buildRows
 * @param type {String}
 * @return allRows {array}
 */
export const buildRows = (type = FORMATION_DIRECTIONS.NATURAL) => {
    const allRows = [];

    switch (type) {
        case FORMATION_DIRECTIONS.NATURAL:
            for (let level = 0; level < 4; level++) {
                for (let row = 0; row < 4; row++) {
                    const singleRow = [];

                    for (let cell = 0; cell < 4; cell++) {
                        singleRow.push([level, row, cell]);
                    }

                    allRows.push(singleRow);
                }
            }

            break;
        case FORMATION_DIRECTIONS.ASC:
            for (let row = 0; row < 4; row++) {
                const singleRow = [];

                for (let levelAndCell = 0; levelAndCell < 4; levelAndCell++) {
                    singleRow.push([levelAndCell, row, levelAndCell]);
                }

                allRows.push(singleRow);
            }

            break;
        case FORMATION_DIRECTIONS.DESC:
            for (let row = 0; row < 4; row++) {
                let decrementor = 3;
                const singleRow = [];

                for (let cell = 0; cell < 4; cell++) {
                    singleRow.push([decrementor, row, cell]);
                    decrementor--;
                }

                allRows.push(singleRow);
            }

            break;
        default:
            break;
    }

    return allRows;
};

/**
 * @function buildColumns
 * @param type {String}
 * @return allColumns {array}
 */
export const buildColumns = (type = FORMATION_DIRECTIONS.NATURAL) => {
    const allColumns = [];

    switch (type) {
        case FORMATION_DIRECTIONS.NATURAL:
            for (let level = 0; level < 4; level++) {
                for (let column = 0; column < 4; column++) {
                    const singleColumn = [];

                    for (let row = 0; row < 4; row++) {
                        singleColumn.push([level, row, column]);
                    }

                    allColumns.push(singleColumn);
                }
            }

            break;
        case FORMATION_DIRECTIONS.ASC:
            for (let column = 0; column < 4; column++) {
                const singleColumn = [];

                for (let levelAndRow = 0; levelAndRow < 4; levelAndRow++) {
                    singleColumn.push([levelAndRow, levelAndRow, column]);
                }

                allColumns.push(singleColumn);
            }

            break;
        case FORMATION_DIRECTIONS.DESC:
            for (let column = 0; column < 4; column++) {
                let decrementor = 3;
                const singleColumn = [];

                for (let row = 0; row < 4; row++) {
                    singleColumn.push([decrementor, column, row]);
                    decrementor--;
                }

                allColumns.push(singleColumn);
            }

            break;
        default:
            break;
    }

    return allColumns;
};

/**
 * @function buildDiagonals
 * @param type {String}
 * @return diagonals {array}
 */
export const buildDiagonals = (type = FORMATION_DIRECTIONS.NATURAL) => {
    let incrementor = 0;
    let decrementor = 3;
    let topDiagonal = [];
    let bottomDiagonal = [];
    const diagonals = [];

    switch (type) {
        case FORMATION_DIRECTIONS.NATURAL:
            for (let level = 0; level < 4; level++) {
                decrementor = 3;
                topDiagonal = [];
                bottomDiagonal = [];

                for (let i = 0; i < 4; i++) {
                    topDiagonal.push([level, i, i]);
                    bottomDiagonal.push([level, decrementor, i]);

                    decrementor--;
                }

                diagonals.push(topDiagonal);
                diagonals.push(bottomDiagonal);
            }

            break;
        case FORMATION_DIRECTIONS.ASC:
            for (let i = 0; i < 4; i++) {
                topDiagonal.push([i, i, i]);
                bottomDiagonal.push([i, decrementor, i]);

                decrementor--;
            }

            diagonals.push(topDiagonal);
            diagonals.push(bottomDiagonal);

            break;
        case FORMATION_DIRECTIONS.DESC:
            for (let i = 3; i >= 0; i--) {
                topDiagonal.push([i, incrementor, incrementor]);
                bottomDiagonal.push([i, i, incrementor]);

                incrementor++;
            }

            diagonals.push(topDiagonal);
            diagonals.push(bottomDiagonal);

            break;
        default:
            break;
    }

    return diagonals;
};

/**
 * @function buildStacks
 * @return allStacks {array}
 */
export const buildStacks = () => {
    const allStacks = [];

    for (let row = 0; row < 4; row++) {
        for (let cell = 0; cell < 4; cell++) {
            const singleStack = [];

            for (let level = 0; level < 4; level++) {
                singleStack.push([level, row, cell]);
            }

            allStacks.push(singleStack);
        }
    }

    return allStacks;
};
