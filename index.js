const program = require('commander');
const Board = require('./board/board');
const Move = require('./move/move');
const Movestack = require('./move/stack');
const fs = require('fs');

program.option("--row <row>", {
    type: Number,
    description: "The row to place the knight in",
    default: 0,
    required: true,
    min: 0,
    max: 7
}).option("--col <col>", {
    type: Number,
    description: "The col to place the knight in",
    default: 0,
    required: true,
    min: 0,
    max: 7
});

program.parse(process.argv);

const startRow = parseInt(program.opts().row);
const startCol = parseInt(program.opts().col);

const main = (startRow, startCol) => {

    const filePath = "./logs/outout-"+startRow+"-"+startCol+".txt";

    let fh = fs.open(filePath, 'w', (err, fd) => {});

    let moveStack = new Movestack();
    let board = new Board(moveStack);

    let moveCount = 0;
    let maxDepth = 0;

    process.stdout.write("Starting position: " + startRow + ", " + startCol + "\n\n");

    let move = new Move(startRow, startCol, []);
    board.genNextMoveWeights(move);

    while (board.moveStack.size() < 63 && moveCount < Number.MAX_SAFE_INTEGER) {
        if (board.moveStack.size() > maxDepth) {
            maxDepth = board.moveStack.size();
        }
        // console.log(board.moveStack.size());
        // console.log(move);
        if (move.hasValidMoves()) {
            let nextMove = move.getNextMove();
            board.placePiece(move);
            board.genNextMoveWeights(nextMove);
            move = nextMove
        }
        else {
            move = board.rewind();

        }

        // board.dumpBoardToFile(filePath);

        if (++ moveCount % 1000000 == 0) {
            if (moveCount % 10000000 == 0) {
                process.stdout.write("Max depth: " + maxDepth + "\n");
                maxDepth = 0;
            }
            else {
                process.stdout.write(".");
            }

        }
    }

    process.stdout.write("\n\n" + moveCount + " moves\n");
    board.printBoard();
    console.log(move);
}

main(startRow, startCol);
