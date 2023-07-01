const program = require('commander');
const Board = require('./board/board');
const Move = require('./move/move');
const Movestack = require('./move/stack');

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


    let moveStack = new Movestack();
    let board = new Board(moveStack);

    let moveCount = 0;

    process.stdout.write("Starting position: " + startRow + ", " + startCol + "\n\n");

    let move = new Move(startRow, startCol, []);
    board.genNextMoveWeights(move);

    while (board.moveStack.size() < 64 && moveCount < Number.MAX_SAFE_INTEGER) {
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

        if (++ moveCount % 1000000 == 0) {
            if (moveCount % 100000000 == 0) {
                process.stdout.write(board.moveStack.size() + "\n");
            }
            else {
                process.stdout.write(".");
            }

        }
    }

    console.log(move);

    // while (moveStack.size() < 64) {
    //     if (move.hasValidMoves()) {

    //         nextMove = move.getNextMove(board)
    //         moveStack.push(move);
    //         move = nextMove;
    //     }
    //     else {
    //         move = moveStack.pop();
    //     }
    // }

    // console.log(moveStack);
    board.printBoard();
}

main(startRow, startCol);
