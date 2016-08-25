/*eslint no-underscore-dangle: ["error", { "allow": ["foo_", "_bar"] }]*/

// From last move, what are possible victories
// - build functions to check for wins
// - add player numbers, and a win equals the pre-specified number

const DIRECTION_FROM_POINT = [
    // top left
    [0, -1, -1],
    // top
    [0, -1, 0],
    // top right
    [0, -1, 1],
    // right
    [0, 0, 1],
    // bottom right
    [0, 1, 1],
    // bottom
    [0, 1, 0],
    // bottom left
    [0, 1, -1],
    // left
    [0, 0, -1],


    // ascending
    [1, 0, 0],
    // descending
    [-1, 0, 0],


    // descending top left
    [-1, -1, -1],
    // descending top
    [-1, -1, 0],
    // descending top, right
    [-1, -1, 1],
    // descending right
    [-1, 0, 1],

    // descending bottom, right
    [-1, 1, 1],
    // descending bottom
    [-1, 1, 0],
    // descending bottom, left
    [-1, 1, -1],
    // descending left
    [-1, 0, -1],

    // ascending top left
    [1, -1, -1],
    // ascending top
    [1, -1, 0],
    // ascending top, right
    [1, -1, 1],
    // ascending right

    [1, 0, 1],
    // ascending bottom, right
    [1, 1, 1],
    // ascending bottom
    [1, 1, 0],
    // ascending bottom, left
    [1, 1, -1],
    // ascending left
    [1, 0, -1]
];

const INVALID_POINT = -100;

export default class VictoryController {
    constructor() {
        this.gameBoard = [];
        this.lastMove = [];
        this.initialComparePoint = [];
        this.comparePoint = [];
        this.nextComparePoint = [];
        this.player = -1;
        this.maxPosition = -1;
        this.shouldCheckOpposite = false;
    }

    isWinningMove(currentGameBoard, lastMove, currentPlayer) {
        console.log('iwm');
        this.gameBoard = currentGameBoard;
        this.player = currentPlayer;
        this.lastMove = lastMove;
        this.maxPosition = currentGameBoard.length - 1;

        return this._isWinningMove();
    }

    // //////////////////////////////////////////////////////////////////////
    // Private Methods
    // //////////////////////////////////////////////////////////////////////

    _isWinningMove() {
        for (let i = 0; i < DIRECTION_FROM_POINT.length; i++) {
            const directionFromPoint = DIRECTION_FROM_POINT[i];
            let nextComparePoint;
            let moveCounter = 0;
            let playerAtPosition = -1;
            let comparePoint = this._findNextComparePoint(directionFromPoint, this.lastMove);
            this.shouldCheckOpposite = true;

            if (!this._isPointValid(comparePoint)) {
                continue;
            }

            playerAtPosition = this._findPlayerAtPoint(comparePoint);

            while (playerAtPosition === this.player) {
                moveCounter++;
                playerAtPosition = -1;

                if (moveCounter === this.maxPosition) {
                    return true;
                }

                nextComparePoint = this._findNextComparePoint(directionFromPoint, comparePoint);

                if (nextComparePoint[0] === INVALID_POINT || !this._isPointValid(nextComparePoint)) {
                    break;
                }

                playerAtPosition = this._findPlayerAtPoint(nextComparePoint);
                comparePoint = nextComparePoint;
            }
        }

        return false;
    }

    // ////////////////////////////////////////////////////////////////
    // Helper Methods
    // ////////////////////////////////////////////////////////////////

    _findNextComparePoint(direction, comparePoint) {
        let nextComparePoint = this._findNextPointForDirection(direction, comparePoint);

        if (!this._isPointValid(nextComparePoint)) {
            if (!this.shouldCheckOpposite) {
                const invalidComparePoint = [INVALID_POINT];

                return invalidComparePoint;
            }

            this.shouldCheckOpposite = false;
            const oppositeDirection = this._findOppositeDirectionFromLastMove(direction, this.lastMove);
            nextComparePoint = this._findNextPointForDirection(oppositeDirection, this.lastMove);
        }

        return nextComparePoint;
    }

    _findNextPointForDirection(direction, point) {
        const level = point[0] + direction[0];
        const row = point[1] + direction[1];
        const cell = point[2] + direction[2];
        const nextComparePoint = [level, row, cell];

        return nextComparePoint;
    }

    _findOppositeDirectionFromLastMove(direction) {
        const oppositeVector = [];

        for (let j = 0; j < direction.length; j++) {
            if (direction[j] === 0) {
                oppositeVector[j] = direction[j];
                continue;
            }

            oppositeVector[j] = direction[j] * -1;
        }

        return oppositeVector;
    }

    _findPlayerAtPoint(point) {
        const level = point[0];
        const row = point[1];
        const cell = point[2];

        return this.gameBoard[level][row][cell];
    }


    _isPointValid(point) {
        const maxPiecePosition = 3;

        for (let i = 0; i < point.Length; i++) {
            if (point[i] < 0 || point[i] > maxPiecePosition) {
                return false;
            }
        }

        return true;
    }
}
