import FormationModel from './FormationModel';
import { buildFormationModelsFromPossibleFormations } from './buildFormations';

/**
 * @class FormationCollection
 */
export default class FormationCollection {
    /**
     * @for FormationCollection
     * @constructor
     */
    constructor() {
        this.formations = buildFormationModelsFromPossibleFormations();
    }

    /**
     * @for FormationCollection
     * @method addFormationToCollection
     * @param formationToAdd {FormationModel}
     */
    addFormationToCollection(formationToAdd) {
        if (formationToAdd instanceof FormationModel) {
            this.formations.push(formationToAdd);
        }
    }

    /**
     * @for FormationCollection
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
