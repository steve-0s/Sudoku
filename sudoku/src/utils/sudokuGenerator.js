
// Check if it's safe to place a number at board[row][col]
const isSafe = (board, row, col, num) => {
    // Check row
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) {
            return false;
        }
    }

    // Check column
    for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) {
            return false;
        }
    }

    // Check 3x3 box
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }

    return true;
};

// Backtracking algorithm to solve/generate the board
const solveSudoku = (board) => {
    let row = -1;
    let col = -1;
    let isEmpty = true;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                row = i;
                col = j;
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty) {
            break;
        }
    }

    // No empty space left
    if (isEmpty) {
        return true;
    }

    // Try numbers 1-9
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // Shuffle numbers for randomness
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    for (let num of numbers) {
        if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) {
                return true;
            }
            board[row][col] = 0; // Backtrack
        }
    }
    return false;
};

// Generate a full valid Sudoku board
const generateFullBoard = () => {
    const board = Array(9).fill().map(() => Array(9).fill(0));
    solveSudoku(board);
    return board;
};

// Create a puzzle by removing numbers
const createPuzzle = (board, difficulty = 40) => {
    const puzzle = board.map(row => [...row]);
    let attempts = difficulty;

    while (attempts > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);

        while (puzzle[row][col] === 0) {
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
        }

        puzzle[row][col] = 0;
        attempts--;
    }
    return puzzle;
};

export const getSudoku = () => {
    const solution = generateFullBoard();
    const puzzle = createPuzzle(solution);
    // Prepare the board state (0 in puzzle means empty, so we use null for empty in app state if preferred, but keeping 0 is fine too, 
    // or mapping 0 to null as per App.jsx initial state).
    // App.jsx uses null for empty cells in initial state: Array(9).fill(null).map(() => Array(9).fill(null))
    // Let's convert 0s to nulls for the solvable board state
    const playableBoard = puzzle.map(row => row.map(cell => cell === 0 ? null : cell));

    return { solution, puzzle, initialBoard: playableBoard };
};
