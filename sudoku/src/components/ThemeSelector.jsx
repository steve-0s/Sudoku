import React from 'react';
import { useTheme, themes } from '../context/ThemeContext';

const ThemeSelector = () => {
    const { currentTheme, setTheme, theme } = useTheme();

    return (
        <div className={`flex gap-2 p-2 rounded-lg ${theme.card} shadow-sm border ${theme.cell.border} justify-center mb-6`}>
            {Object.keys(themes).map((themeKey) => (
                <button
                    key={themeKey}
                    onClick={() => setTheme(themeKey)}
                    className={`
                        px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                        ${currentTheme === themeKey
                            ? theme.button
                            : 'bg-transparent hover:bg-black/5 opacity-70 hover:opacity-100'}
                    `}
                >
                    {themes[themeKey].name}
                </button>
            ))}
        </div>
    );
};

export default ThemeSelector;
