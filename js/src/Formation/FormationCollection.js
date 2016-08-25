import FormationModel from './FormationModel';

import {
    FORMATION_DIRECTIONS,
    buildRows,
    buildColumns,
    buildDiagonals,
    buildStacks
} from './buildFormations';

const POSSIBLE_FORMATIONS = {
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
 * @class FormationCollection
 */
export default class FormationCollection {
    constructor() {
        this.formations = [];

        this.buildFormationModels();
    }

    /**
     * @method buildFormationModels
     */
    buildFormationModels() {
        for (const formation in POSSIBLE_FORMATIONS) {
            this.createNewModelsFromFormations(formation, POSSIBLE_FORMATIONS[formation]);
        }
    }

    /**
     * @method createNewModelsFromFormations
     * @param formationName {string}
     * @param formationList {array}
     */
    createNewModelsFromFormations(formationName, formationList) {
        for (let i = 0; i < formationList.length; i++) {
            const formationModel = new FormationModel(formationName, formationList[i]);

            this.addFormationToCollection(formationModel);
        }
    }

    /**
     * @method addFormationToCollection
     * @param formationToAdd {FormationModel}
     */
    addFormationToCollection(formationToAdd) {
        if (formationToAdd instanceof FormationModel) {
            this.formations.push(formationToAdd);
        }
    }

    /**
     * @method filterFormationsForPoint
     * @param point {array}
     * @return filteredFormations {array}
     */
    filterFormationsForPoint(point) {
        const filteredFormations = [];

        for (let i = 0; i < this.formations.length; i++) {
            const formation = this.formations[i];

            if (formation.isPointWithinFormation(point)) {
                filteredFormations.push(formation);
            }
        }

        return filteredFormations;
    }
}
