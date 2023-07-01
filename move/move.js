const POSSIBLE_MOVES = require('./possibleMoves');

class Move {
    constructor(row, col, weights) {
        this.row = row;
        this.col = col;
        this.weights = weights;
    }



    getNextMove() {
        let maxWeight = 0;
        let maxWeightIndex = 0;

        for (const [index,weight] of this.weights.entries()) {
            if (weight > maxWeight) {
                maxWeight = weight;
                maxWeightIndex = index;
            }
        }

        if (maxWeight == 0) {
            return null;
        }

        this.weights[maxWeightIndex] = 0;

        const [rowDelta, colDelta] = POSSIBLE_MOVES[maxWeightIndex];

        let nextRow = this.row + rowDelta;
        let nextCol = this.col + colDelta;

        let nextMove = new Move(nextRow, nextCol, []);
        return nextMove;
    }

    hasValidMoves() {
        for (const weight of this.weights) {
            if (weight > 0) {
                return true;
            }
        }

        return false;
    }
}

module.exports = Move;
