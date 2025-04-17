// othello.ts

import * as readline from 'readline';

type Piece = 'B' | 'W' | null;

class Board {
    size: number = 8;
    board: Piece[][];
    currentPlayer: 'B' | 'W';

    constructor() {
        this.board = Array.from({ length: this.size }, () => Array(this.size).fill(null));
        this.currentPlayer = 'B';
        this.initializeBoard();
    }

    initializeBoard() {
        const mid = this.size / 2;
        this.board[mid - 1][mid - 1] = 'W';
        this.board[mid][mid] = 'W';
        this.board[mid - 1][mid] = 'B';
        this.board[mid][mid - 1] = 'B';
    }

    printBoard() {
        const header = '   ' + Array.from({ length: this.size }, (_, i) => String.fromCharCode(97 + i)).join(' ');
        console.log(header);
        for (let i = 0; i < this.size; i++) {
            let row = `${i + 1}`.padStart(2) + ' ';
            for (let j = 0; j < this.size; j++) {
                const cell = this.board[i][j];
                row += (cell ? cell : '.') + ' ';
            }
            console.log(row);
        }
        console.log(`Current Turn: ${this.currentPlayer === 'B' ? 'Black' : 'White'}`);
    }

    placePiece(position: string): boolean {
        const colChar = position[0].toLowerCase();
        const rowChar = position[1];

        const col = colChar.charCodeAt(0) - 97;
        const row = parseInt(rowChar) - 1;

        if (
            col < 0 || col >= this.size ||
            row < 0 || row >= this.size ||
            this.board[row][col] !== null
        ) {
            console.log("Invalid move. Try again.");
            return false;
        }

        //TODO: Implementation here

        this.board[row][col] = this.currentPlayer;
        return true;
    }
}

// Game logic
const game = new Board();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function promptMove() {
    game.printBoard();
    rl.question(`Your move (e.g., a1): `, (input) => {
        game.placePiece(input.trim());

        promptMove();
    });
}

promptMove();
