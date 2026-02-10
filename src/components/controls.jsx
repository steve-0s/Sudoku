import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Controls = ({ handleCheck, handleReset, handleNewPuzzle }) => {
    const { theme } = useTheme();

    return (
        <div className="flex flex-wrap justify-center gap-4">
            <button
                className={`
                    px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95
                    ${theme.button}
                `}
                onClick={handleCheck}
            >
                Check
            </button>
            <button
                className={`
                    px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95
                    ${theme.button}
                `}
                onClick={handleReset}
            >
                Reset
            </button>
            <button
                className={`
                    px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95
                    ${theme.button}
                `}
                onClick={handleNewPuzzle}
            >
                New Puzzle
            </button>
        </div>
    )
}

export default Controls