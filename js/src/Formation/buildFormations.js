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
    }

    return allColumns;
};

/**
 * @function buildDiagonals
 * @param type {String}
 * @return diagonals {array}
 */
export const buildDiagonals = (type = FORMATION_DIRECTIONS.ASC) => {
    const diagonals = [];

    if (type === FORMATION_DIRECTIONS.NATURAL) {
        for (let level = 0; level < 4; level++) {
            let decrementor = 3;
            const topNaturalDiagonal = [];
            const bottomNaturalDiagonal = [];

            for (let i = 0; i < 4; i++) {
                topNaturalDiagonal.push([level, i, i]);
                bottomNaturalDiagonal.push([level, decrementor, i]);

                decrementor--;
            }

            diagonals.push(topNaturalDiagonal);
            diagonals.push(bottomNaturalDiagonal);
        }
    } else if (type === FORMATION_DIRECTIONS.ASC) {
        let decrementor = 3;
        const topDiagonal = [];
        const bottomDiagonal = [];

        for (let i = 0; i < 4; i++) {
            topDiagonal.push([i, i, i]);
            bottomDiagonal.push([i, decrementor, i]);

            decrementor--;
        }

        diagonals.push(topDiagonal);
        diagonals.push(bottomDiagonal);
    } else if (type === FORMATION_DIRECTIONS.DESC) {
        let incrementor = 0;
        const topDiagonal = [];
        const bottomDiagonal = [];

        for (let i = 3; i >= 0; i--) {
            topDiagonal.push([i, incrementor, incrementor]);
            bottomDiagonal.push([i, i, incrementor]);

            incrementor++;
        }

        diagonals.push(topDiagonal);
        diagonals.push(bottomDiagonal);
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
