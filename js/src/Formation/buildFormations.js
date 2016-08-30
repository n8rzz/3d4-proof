import FormationPointModel from './FormationPointModel';
import FormationModel from './FormationModel';

const MAX_LENGTH = 4;

const FORMATION_DIRECTIONS = {
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
            for (let level = 0; level < MAX_LENGTH; level++) {
                for (let row = 0; row < MAX_LENGTH; row++) {
                    const singleRow = [];

                    for (let cell = 0; cell < MAX_LENGTH; cell++) {
                        singleRow.push(new FormationPointModel(level, row, cell));
                    }

                    allRows.push(singleRow);
                }
            }

            break;
        case FORMATION_DIRECTIONS.ASC:
            for (let row = 0; row < MAX_LENGTH; row++) {
                const singleRow = [];

                for (let levelAndCell = 0; levelAndCell < MAX_LENGTH; levelAndCell++) {
                    singleRow.push(new FormationPointModel(levelAndCell, row, levelAndCell));
                }

                allRows.push(singleRow);
            }

            break;
        case FORMATION_DIRECTIONS.DESC:
            for (let row = 0; row < MAX_LENGTH; row++) {
                let decrementor = 3;
                const singleRow = [];

                for (let cell = 0; cell < MAX_LENGTH; cell++) {
                    singleRow.push(new FormationPointModel(decrementor, row, cell));
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
            for (let level = 0; level < MAX_LENGTH; level++) {
                for (let column = 0; column < MAX_LENGTH; column++) {
                    const singleColumn = [];

                    for (let row = 0; row < MAX_LENGTH; row++) {
                        singleColumn.push(new FormationPointModel(level, row, column));
                    }

                    allColumns.push(singleColumn);
                }
            }

            break;
        case FORMATION_DIRECTIONS.ASC:
            for (let column = 0; column < MAX_LENGTH; column++) {
                const singleColumn = [];

                for (let levelAndRow = 0; levelAndRow < MAX_LENGTH; levelAndRow++) {
                    singleColumn.push(new FormationPointModel(levelAndRow, levelAndRow, column));
                }

                allColumns.push(singleColumn);
            }

            break;
        case FORMATION_DIRECTIONS.DESC:
            for (let column = 0; column < MAX_LENGTH; column++) {
                let decrementor = 3;
                const singleColumn = [];

                for (let row = 0; row < MAX_LENGTH; row++) {
                    singleColumn.push(new FormationPointModel(decrementor, column, row));
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
            for (let level = 0; level < MAX_LENGTH; level++) {
                decrementor = 3;
                topDiagonal = [];
                bottomDiagonal = [];

                for (let i = 0; i < MAX_LENGTH; i++) {
                    topDiagonal.push(new FormationPointModel(level, i, i));
                    bottomDiagonal.push(new FormationPointModel(level, decrementor, i));

                    decrementor--;
                }

                diagonals.push(topDiagonal);
                diagonals.push(bottomDiagonal);
            }

            break;
        case FORMATION_DIRECTIONS.ASC:
            for (let i = 0; i < MAX_LENGTH; i++) {
                topDiagonal.push(new FormationPointModel(i, i, i));
                bottomDiagonal.push(new FormationPointModel(i, decrementor, i));

                decrementor--;
            }

            diagonals.push(topDiagonal);
            diagonals.push(bottomDiagonal);

            break;
        case FORMATION_DIRECTIONS.DESC:
            for (let i = 3; i >= 0; i--) {
                topDiagonal.push(new FormationPointModel(i, incrementor, incrementor));
                bottomDiagonal.push(new FormationPointModel(i, i, incrementor));

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

    for (let row = 0; row < MAX_LENGTH; row++) {
        for (let cell = 0; cell < MAX_LENGTH; cell++) {
            const singleStackFormation = [];

            for (let level = 0; level < MAX_LENGTH; level++) {
                const stack = new FormationPointModel(level, row, cell);
                singleStackFormation.push(stack);
            }

            allStacks.push(singleStackFormation);
        }
    }

    return allStacks;
};

export const POSSIBLE_FORMATIONS = {
    ROW_NATURAL: buildRows(FORMATION_DIRECTIONS.NATURAL),
    ROW_ASC: buildRows(FORMATION_DIRECTIONS.ASC),
    ROW_DESC: buildRows(FORMATION_DIRECTIONS.DESC),
    COLUMN_NATURAL: buildColumns(FORMATION_DIRECTIONS.NATURAL),
    COLUMN_ASC: buildColumns(FORMATION_DIRECTIONS.ASC),
    COLUMN_DESC: buildColumns(FORMATION_DIRECTIONS.DESC),
    DIAGONAL_NATURAL: buildDiagonals(FORMATION_DIRECTIONS.NATURAL),
    DIAGONAL_ASC: buildDiagonals(FORMATION_DIRECTIONS.ASC),
    DIAGONAL_DESC: buildDiagonals(FORMATION_DIRECTIONS.DESC),
    STACK_NATURAL: buildStacks(FORMATION_DIRECTIONS.NATURAL)
};


/**
 * Instantiate new FormationModels from a list of formations
 *
* @function createNewModelsFromFormations
* @param formationName {string}
* @param formationList {array}
* @return formationModels {array}
*/
const createNewModelsFromFormations = (formationName, formationList) => {
    const formationModels = [];

    for (let i = 0; i < formationList.length; i++) {
        const formationModel = new FormationModel(formationName, formationList[i]);

        formationModels.push(formationModel);
    }

    return formationModels;
};

/**
 * Assemble a list of FormationModels from the POSSIBLE_FORMATIONS list.
 *
 * @function buildFormationModelsFromPossibleFormations
 * @return formationModelList {array}
 */
export const buildFormationModelsFromPossibleFormations = () => {
    const formationModelList = [];

    for (let formation in POSSIBLE_FORMATIONS) {
        formationModelList.push(...createNewModelsFromFormations(formation, POSSIBLE_FORMATIONS[formation]));
    }

    return formationModelList;
};
