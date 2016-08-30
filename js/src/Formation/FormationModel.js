let ID = 0;

/**
 * @class FormationModel
 */
export default class FormationModel {
    /**
     * @for FormationModel
     * @constructor
     * @param formationType {string}
     * @param points {array}
     */
    constructor(formationType = '', points = []) {
        if (formationType === '' || points.length === 0) {
            throw new TypeError('Invalid parameters passed to FormationModel');
        }

        this._id = ID++;
        this.type = formationType;
        this.points = points;
        this.isPossible = true;
    }

    /**
     * @method isPointWithinFormation
     * @param comparePoint {array}
     * @return {boolean}
     */
    isPointWithinFormation(comparePoint = null) {
        if (comparePoint === null) {
            throw new TypeError('Invalid paramater passed to isPointWithinFormation. Expected an instanceof FormationPointModel.');
        }

        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];

            if (point.isEqualToComparePoint(comparePoint)) {
                return true;
            }
        }

        return false;
    }
}
