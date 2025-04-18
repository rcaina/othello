"use strict";
// othello.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
class Color {
}
Color.BLACK = 'B';
Color.WHITE = 'W';
class Board {
    constructor() {
        this.size = 8;
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
    placePiece(position) {
        const colChar = position[0].toLowerCase();
        const rowChar = position[1];
        const col = colChar.charCodeAt(0) - 97;
        const row = parseInt(rowChar) - 1;
        function checkUp(board, row, col, player) {
            const opponent = player === Color.BLACK ? Color.WHITE : Color.BLACK;
            const needToFlip = [];
            let r = row - 1;
            while (r >= 0 && board[r][col] === opponent) {
                needToFlip.push([r, col]);
                r--;
            }
            if (r >= 0 && board[r][col] === player && needToFlip.length > 0) {
                for (const [fr, fc] of needToFlip) {
                    board[fr][fc] = player;
                }
                return true;
            }
            return false;
        }
        function checkDown(board, row, col, player) {
            const opponent = player === Color.BLACK ? Color.WHITE : Color.BLACK;
            const needToFlip = [];
            let r = row + 1;
            while (r < 8 && board[r][col] === opponent) {
                needToFlip.push([r, col]);
                r++;
            }
            if (r < 8 && board[r][col] === player && needToFlip.length > 0) {
                for (const [fr, fc] of needToFlip) {
                    board[fr][fc] = player;
                }
                return true;
            }
            return false;
        }
        function checkRight(board, row, col, player) {
            const opponent = player === Color.BLACK ? Color.WHITE : Color.BLACK;
            const needToFlip = [];
            let c = col + 1;
            while (c < 8 && board[row][c] === opponent) {
                needToFlip.push([row, c]);
                c++;
            }
            if (c < 8 && board[row][c] === player && needToFlip.length > 0) {
                for (const [fr, fc] of needToFlip) {
                    board[fr][fc] = player;
                }
                return true;
            }
            return false;
        }
        function checkLeft(board, row, col, player) {
            const opponent = player === Color.BLACK ? Color.WHITE : Color.BLACK;
            const needToFlip = [];
            let c = col - 1;
            while (c >= 0 && board[row][c] === opponent) {
                needToFlip.push([row, c]);
                c--;
            }
            if (c >= 0 && board[row][c] === player && needToFlip.length > 0) {
                for (const [fr, fc] of needToFlip) {
                    board[fr][fc] = player;
                }
                return true;
            }
            return false;
        }
        if (col < 0 || col >= this.size ||
            row < 0 || row >= this.size ||
            this.board[row][col] !== null) {
            console.log("Invalid move. Try again.");
            return false;
        }
        //TODO: Implementation here
        let validMove = false;
        //checkUp
        if (row - 1 >= 0 && this.board[row - 1][col] !== null && this.board[row - 1][col] !== this.currentPlayer) {
            const valid = checkUp(this.board, row, col, this.currentPlayer);
            if (valid) {
                validMove = true;
            }
        }
        //checkDown
        if (row + 1 >= 0 && this.board[row + 1][col] !== null && this.board[row + 1][col] !== this.currentPlayer) {
            const valid = checkDown(this.board, row, col, this.currentPlayer);
            if (valid) {
                validMove = true;
            }
        }
        //checkRight
        if (col + 1 >= 0 && this.board[row][col + 1] !== null && this.board[row][col + 1] !== this.currentPlayer) {
            const valid = checkRight(this.board, row, col, this.currentPlayer);
            if (valid) {
                validMove = true;
            }
        }
        //checkLeft
        if (col - 1 >= 0 && this.board[row][col - 1] !== null && this.board[row][col - 1] !== this.currentPlayer) {
            const valid = checkLeft(this.board, row, col, this.currentPlayer);
            if (valid) {
                validMove = true;
            }
        }
        //checkUpRight
        //checkUpLeft
        //checkDownRight
        //checkDownLeft
        if (!validMove) {
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
function promptMove() {
    game.printBoard();
    rl.question(`Your move (e.g., a1): `, (input) => {
        game.placePiece(input.trim());
        promptMove();
    });
}
promptMove();
