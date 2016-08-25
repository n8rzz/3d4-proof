let ID = 0;
const LEVEL = 0;
const ROW = 1;
const COLUMN = 2;

/**
 * @class FormationModel
 */
export default class FormationModel {
    constructor(formationType = '', points = 0) {
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
    isPointWithinFormation(comparePoint) {
        if (comparePoint.length !== 3) {
            throw new TypeError('Invalid paramater passed to isPointWithinFormation. Expected an array of length 3.');
        }

        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];

            if (
                comparePoint[LEVEL] === point[LEVEL] &&
                comparePoint[ROW] === point[ROW] &&
                comparePoint[COLUMN] === point[COLUMN]
            ) {
                return true;
            }
        }

        return false;
    }
}
