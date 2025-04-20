// othello.ts

import * as readline from 'readline';

class Color {
    static readonly BLACK: 'B' = 'B';
    static readonly WHITE: 'W' = 'W';
}

type Piece = typeof Color.BLACK | typeof Color.WHITE | null;

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

    checkUp(board: Piece[][], row: number, col: number, player: Piece) {
        const opponent = player === Color.BLACK ? Color.WHITE: Color.BLACK;
        const needToFlip: [number, number][] = [];
        let r = row - 1;

        while(r >= 0 && board[r][col] === opponent){
            needToFlip.push([r, col]);
            r--;
        }

        if(r >=0 && board[r][col] === player && needToFlip.length > 0){
            for(const [fr, fc] of needToFlip){
                board[fr][fc] = player;
            }
            return true;
        }

        return false;
    }
    checkDown(board: Piece[][], row: number, col: number, player: Piece) {
        const opponent = player === Color.BLACK ? Color.WHITE: Color.BLACK;
        const needToFlip: [number, number][] = [];
        let r = row + 1;

        while(r < 8 && board[r][col] === opponent){
            needToFlip.push([r, col]);
            r++;
        }

        if(r < 8 && board[r][col] === player && needToFlip.length > 0){
            for(const [fr, fc] of needToFlip){
                board[fr][fc] = player;
            }
            return true;
        }

        return false;
    }
    checkRight(board: Piece[][], row: number, col: number, player: Piece) {
        const opponent = player === Color.BLACK ? Color.WHITE: Color.BLACK;
        const needToFlip: [number, number][] = [];
        let c = col + 1;

        while(c < 8 && board[row][c] === opponent){
            needToFlip.push([row, c]);
            c++;
        }

        if(c < 8 && board[row][c] === player && needToFlip.length > 0){
            for(const [fr, fc] of needToFlip){
                board[fr][fc] = player;
            }
            return true;
        }

        return false;
    }
    checkLeft(board: Piece[][], row: number, col: number, player: Piece) {
        const opponent = player === Color.BLACK ? Color.WHITE: Color.BLACK;
        const needToFlip: [number, number][] = [];
        let c = col - 1;

        while(c >= 0 && board[row][c] === opponent){
            needToFlip.push([row, c]);
            c--;
        }

        if(c >= 0 && board[row][c] === player && needToFlip.length > 0){
            for(const [fr, fc] of needToFlip){
                board[fr][fc] = player;
            }
            return true;
        }

        return false;
    }
    checkUpRight(board: Piece[][], row: number, col: number, player: Piece) {
        const opponent = player === Color.BLACK ? Color.WHITE: Color.BLACK;
        const needToFlip: [number, number][] = [];
        let r = row - 1;
        let c = col + 1;

        while(c < 8 && r >= 0 && board[r][c] === opponent){
            needToFlip.push([r, c]);
            c++;
            r--;
        }

        if(c < 8 && r >= 0 && board[r][c] === player && needToFlip.length > 0){
            for(const [fr, fc] of needToFlip){
                board[fr][fc] = player;
            }
            return true;
        }

        return false;
    }
    checkUpLeft(board: Piece[][], row: number, col: number, player: Piece) {
        const opponent = player === Color.BLACK ? Color.WHITE: Color.BLACK;
        const needToFlip: [number, number][] = [];
        let r = row - 1;
        let c = col - 1;

        while(c >= 0 && r >= 0 && board[r][c] === opponent){
            needToFlip.push([r, c]);
            c--;
            r--;
        }

        if(c >= 0 && r >= 0 && board[r][c] === player && needToFlip.length > 0){
            for(const [fr, fc] of needToFlip){
                board[fr][fc] = player;
            }
            return true;
        }

        return false;
    }
    checkDownRight(board: Piece[][], row: number, col: number, player: Piece) {
        const opponent = player === Color.BLACK ? Color.WHITE: Color.BLACK;
        const needToFlip: [number, number][] = [];
        let r = row + 1;
        let c = col + 1;

        while(c < 8 && r < 8 && board[r][c] === opponent){
            needToFlip.push([r, c]);
            c++;
            r++;
        }

        if(c < 8 && r < 8 && board[r][c] === player && needToFlip.length > 0){
            for(const [fr, fc] of needToFlip){
                board[fr][fc] = player;
            }
            return true;
        }

        return false;
    }
    checkDownLeft(board: Piece[][], row: number, col: number, player: Piece) {
        const opponent = player === Color.BLACK ? Color.WHITE: Color.BLACK;
        const needToFlip: [number, number][] = [];
        let r = row + 1;
        let c = col - 1;

        while(c >= 0 && r < 8 && board[r][c] === opponent){
            needToFlip.push([r, c]);
            c--;
            r++;
        }

        if(c >= 0 && r < 8 && board[r][c] === player && needToFlip.length > 0){
            for(const [fr, fc] of needToFlip){
                board[fr][fc] = player;
            }
            return true;
        }

        return false;
    }
    availableMove(player: Piece): boolean {
        for(let row = 0; row < game.size; row++){
            for(let col = 0; col < game.size; col++){
                if(game.board[row][col] !== null) continue
                
                const directions = [
                    this.checkUp, this.checkDown, this.checkLeft, this.checkRight,
                    this.checkUpLeft, this.checkUpRight, this.checkDownLeft, this.checkDownRight
                ];
    
                for (const dir of directions) {
                    // Clone the board to simulate move without altering real board
                    const simulatedBoard = game.board.map(r => r.slice());
                    if (dir(simulatedBoard, row, col, player)) {
                        return true;
                    }
                }
            }
        }
    
        return false
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
        //check if they have any valid moves left else skip turn

        //TODO: Implementation starts here
        let validMove = false;

        //checkUp
        if(row - 1 >= 0 && this.board[row-1][col] !== null && this.board[row-1][col] !== this.currentPlayer){
            const valid = this.checkUp(this.board, row, col, this.currentPlayer);
            if(valid){
                validMove = true;
            }
        }
        //checkDown
        if(row + 1 >= 0 && this.board[row+1][col] !== null && this.board[row+1][col] !== this.currentPlayer){
            const valid = this.checkDown(this.board, row, col, this.currentPlayer);
            if(valid){
                validMove = true;
            }
        }
        //checkRight
        if(col + 1 >= 0 && this.board[row][col+1] !== null && this.board[row][col+1] !== this.currentPlayer){
            const valid = this.checkRight(this.board, row, col, this.currentPlayer);
            if(valid){
                validMove = true;
            }
        }
        //checkLeft
        if(col - 1 >= 0 && this.board[row][col-1] !== null && this.board[row][col-1] !== this.currentPlayer){
            const valid = this.checkLeft(this.board, row, col, this.currentPlayer);
            if(valid){
                validMove = true;
            }
        }
        //checkUpRight
        if(row - 1 >= 0 && col + 1 >= 0 && this.board[row-1][col+1] !== null && this.board[row-1][col+1] !== this.currentPlayer){
            const valid = this.checkUpRight(this.board, row, col, this.currentPlayer);
            if(valid){
                validMove = true;
            }
        }
        //checkUpLeft
        if(row - 1 >= 0 && col - 1 >= 0 && this.board[row-1][col-1] !== null && this.board[row-1][col-1] !== this.currentPlayer){
            const valid = this.checkUpLeft(this.board, row, col, this.currentPlayer);
            if(valid){
                validMove = true;
            }
        }
        //checkDownRight
        if(row + 1 >= 0 && col + 1 >= 0 && this.board[row+1][col+1] !== null && this.board[row+1][col+1] !== this.currentPlayer){
            const valid = this.checkDownRight(this.board, row, col, this.currentPlayer);
            if(valid){
                validMove = true;
            }
        }
        //checkDownLeft
        if(row + 1 >= 0 && col - 1 >= 0 && this.board[row+1][col-1] !== null && this.board[row+1][col-1] !== this.currentPlayer){
            const valid = this.checkDownLeft(this.board, row, col, this.currentPlayer);
            if(valid){
                validMove = true;
            }
        }

        if(!validMove){
            console.log("Invalid move. Try again.");
            return false;
        }


        this.board[row][col] = this.currentPlayer;

        //switch turns after succesful move
        this.currentPlayer = this.currentPlayer === Color.BLACK ? Color.WHITE : Color.BLACK;
        return true;
    }
}

// Game logic
const game = new Board();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let consecutivePasses = 0;

function promptMove() {
    game.printBoard();

    function declareWinner() {
        let blackCount = 0;
        let whiteCount = 0;
    
        for (let row of game.board) {
            for (let cell of row) {
                if (cell === 'B') blackCount++;
                if (cell === 'W') whiteCount++;
            }
        }
    
        console.log(`Final Score - Black: ${blackCount}, White: ${whiteCount}`);
        if (blackCount > whiteCount) {
            console.log("Black wins!");
        } else if (whiteCount > blackCount) {
            console.log("White wins!");
        } else {
            console.log("It's a tie!");
        }
    }

    if (!game.availableMove(game.currentPlayer)) {
        console.log(`${game.currentPlayer === 'B' ? 'Black' : 'White'} has no valid moves. Passing turn.`);
        consecutivePasses++;

        if (consecutivePasses >= 2) {
            console.log("No valid moves for both players. Game over.");
            declareWinner();
            rl.close();
            return;
        }

        game.currentPlayer = game.currentPlayer === 'B' ? 'W' : 'B';
        promptMove();
        return;
    }

    consecutivePasses = 0;

    rl.question(`Your move (${game.currentPlayer === 'B' ? 'Black' : 'White'}): `, (input) => {
        const moveSuccessful = game.placePiece(input.trim());
        if (!moveSuccessful) {
            promptMove(); // retry
        } else {
            promptMove();
        }
    });
}

promptMove();
