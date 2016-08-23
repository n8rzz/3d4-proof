import directionsFromPoint from './directionsFromPoint';

const GAME_BOARD_SIZE = 4;

const rowOrColumn = (isColumn = false) => {
    let pointsForFormation = [];

    for (let l = 0; l < GAME_BOARD_SIZE; l++) {
        let level = [];

        for (let r = 0; r < GAME_BOARD_SIZE; r++) {
            let row = [];

            for (let c = 0; c < GAME_BOARD_SIZE; c++) {


                row.push([l, r, c]);
            }

            level.push(row);
        }

        pointsForFormation.push(level);
    }

    return pointsForFormation;
};

const POSSIBLE_FORMATIONS = {
    ROW: {
        NATURAL: rowOrColumn(),
        ASCENDING: {},
        DESCENDING: {}
    },
    COLUMN: {
        NATURAL: {},
        ASCENDING: {},
        DESCENDING: {}
    },
    DIAGONAL: {
        NATURAL: {},
        ASCENDING: {},
        DESCENDING: {}
    },
    STACK: {}
};

class FormationCalculator {
    constructor() {
        console.log(POSSIBLE_FORMATIONS.ROW.NATURAL);
    }

    // findFormationsForPoint(point, gameBoard) {}
}

export default new FormationCalculator();
