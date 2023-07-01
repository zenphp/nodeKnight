const Board = require('./board/board');
const Move = require('./move/move');
const Movestack = require('./move/stack');


const main = (startRow, startCol) => {

    let moveStack = new Movestack();
    let board = new Board(moveStack);

    let moveCount = 0;
    let maxDepth = 0;

    process.stdout.write("Starting position: " + startRow + ", " + startCol + "\n\n");
    process.stdout.write("Calculating moves: ( . = 1,000,000 moves)\n");
    let move = new Move(startRow, startCol, []);
    board.genNextMoveWeights(move);

    while (board.moveStack.size() <= 63 && moveCount < Number.MAX_SAFE_INTEGER) {
        if (board.moveStack.size() > maxDepth) {
            maxDepth = board.moveStack.size();
        }
        if (move.hasValidMoves()) {
            let nextMove = move.getNextMove();
            board.placePiece(move);
            board.genNextMoveWeights(nextMove);
            move = nextMove
        }
        else if (board.moveStack.size() == 63) {
            board.placePiece(move);
        }
        else {
            move = board.rewind();
        }

        if (++moveCount % 1000000 == 0) {
            process.stdout.write(".");
        }
    }

    process.stdout.write("\n\nTotal: " + Intl.NumberFormat('en-us').format(moveCount) + " moves calculated.\n");
    board.printBoard();
    process.stdout.write("=========================================\n");
}

for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        main(row, col);
    }
}

// main(startRow, startCol);
