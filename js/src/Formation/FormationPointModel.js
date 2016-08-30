/**
 * @class FormationPointModel
 */
export default class FormationPointModel {
    constructor(level = -1, row = -1, column = -1) {
        if (level === -1 || column === -1 || row === -1) {
            throw new TypeError('Invalid parameters. Expected a positive integer');
        }

        this.level = level;
        this.row = row;
        this.column = column;
    }

    /**
     * @for FormationPointModel
     * @method toArray
     * @return {array}
     */
    toArray() {
        return [this.level, this.row, this.column];
    }
}
