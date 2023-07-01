const POSSIBLE_MOVES = require('../move/possibleMoves');

class Board{
    constructor(moveStack){
        this.moveStack = moveStack;
        this.board = [];
        for (let i = 0; i < 8; i++){
            this.board.push(new Array(8).fill(0));
        }
    }

    printBoard(){
        process.stdout.write("\n");
        for (let i = 0; i < 8; i++){
            for (let j=0; j < 8; j++){
                process.stdout.write(this.board[i][j].toString().padStart(3,' ') + "\t");
            }
            process.stdout.write("\n");
        }
    }

    placePiece(move) {
        this.moveStack.push(move);
        this.board[move.row][move.col] = this.moveStack.size();
    }

    rewind() {
        let move = this.moveStack.pop();
        this.board[move.row][move.col] = 0;
        return move;
    }

    genNextMoveWeights(move) {
        move.weights = [];
        for (const [index,nextPos] of POSSIBLE_MOVES.entries()) {
            let [rowDelta, colDelta] = nextPos;

            let nextRow = move.row + rowDelta;
            let nextCol = move.col + colDelta;

            if (nextRow < 0 || nextRow > 7 || nextCol < 0 || nextCol > 7) {
                move.weights[index] = 0;
            }
            else if (this.board[nextRow][nextCol] != 0) {
                move.weights[index] = 0;
            }
            else if ((nextRow == 0 || nextRow == 7) && (nextCol == 0 || nextCol == 7)) {
                move.weights[index] = 5;
            }
            else if (nextRow == 0 || nextRow == 7 || nextCol == 0 || nextCol == 7) {
                move.weights[index] = 3;
            }
            else {
                move.weights[index] = 1;
            }
        }
    };
}

module.exports = Board;
