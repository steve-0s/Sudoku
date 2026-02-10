import React from 'react';
import { useTheme } from '../context/ThemeContext';

const DifficultySelector = ({ difficulty, setDifficulty }) => {
    const { theme } = useTheme();
    const difficulties = ['Easy', 'Medium', 'Hard'];

    return (
        <div className="mb-6">
            <label className="block text-sm font-semibold mb-3 text-center opacity-80">
                Difficulty Level
            </label>
            <div className="flex gap-2 justify-center">
                {difficulties.map((level) => (
                    <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${difficulty === level
                                ? theme.button
                                : `${theme.card} border ${theme.boardBorder} hover:opacity-80`
                            }`}
                    >
                        {level}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DifficultySelector;
