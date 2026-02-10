const API_BASE_URL = 'https://sudoku-api.vercel.app/api/dosuku';

/**
 * Fetches a new Sudoku puzzle from the API
 * @param {string} difficulty - The difficulty level (Easy, Medium, Hard)
 * @returns {Promise<{puzzle: number[][], solution: number[][], initialBoard: (number|null)[][]}>}
 */
export const fetchSudokuPuzzle = async (difficulty = 'Medium') => {
    try {
        const response = await fetch(`${API_BASE_URL}?query={newboard(limit:1){grids{value,solution,difficulty}}}`);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        const grid = data.newboard.grids[0];

        // Transform API response to match our app's format
        const puzzle = grid.value;
        const solution = grid.solution;

        // Create initial board with null for empty cells
        const initialBoard = puzzle.map(row =>
            row.map(cell => cell === 0 ? null : cell)
        );

        return {
            puzzle,
            solution,
            initialBoard,
            difficulty: grid.difficulty
        };
    } catch (error) {
        console.error('Error fetching Sudoku puzzle:', error);
        throw error;
    }
};

/**
 * Fetches only the solution for a given puzzle
 * @returns {Promise<{solution: number[][]}>}
 */
export const fetchSudokuSolution = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}?query={newboard(limit:1){grids{solution}}}`);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        return {
            solution: data.newboard.grids[0].solution
        };
    } catch (error) {
        console.error('Error fetching Sudoku solution:', error);
        throw error;
    }
};

/**
 * Fetches puzzle difficulty information
 * @returns {Promise<{difficulty: string}>}
 */
export const fetchSudokuDifficulty = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}?query={newboard(limit:1){grids{difficulty}}}`);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        return {
            difficulty: data.newboard.grids[0].difficulty
        };
    } catch (error) {
        console.error('Error fetching Sudoku difficulty:', error);
        throw error;
    }
};
