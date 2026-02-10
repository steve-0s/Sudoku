import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const themes = {
    light: {
        name: 'Light',
        bg: 'bg-slate-50',
        text: 'text-slate-900',
        card: 'bg-white',
        boardBorder: 'border-slate-800',
        cell: {
            base: 'text-indigo-600 hover:bg-slate-100 focus:bg-indigo-50',
            prefilled: 'bg-slate-100 text-slate-900 font-bold',
            selected: 'bg-indigo-200 text-indigo-800 font-bold shadow-inner',
            highlighted: 'bg-indigo-50 text-indigo-600',
            border: 'border-slate-400',
            borderBold: 'border-slate-900'
        },
        button: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200',
        status: 'text-indigo-700'
    },
    nature: {
        name: 'Nature',
        bg: 'bg-gradient-to-tl from-amber-900 via-green-800 to-emerald-700',
        text: 'text-stone-800',
        card: 'bg-[#fdfaf6]',
        boardBorder: 'border-stone-700',
        cell: {
            base: 'text-emerald-800 hover:bg-stone-200 focus:bg-emerald-50',
            prefilled: 'bg-stone-200 text-stone-900 font-bold',
            selected: 'bg-emerald-200 text-emerald-900 font-bold shadow-inner',
            highlighted: 'bg-emerald-50 text-emerald-700',
            border: 'border-stone-400',
            borderBold: 'border-stone-700'
        },
        button: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200',
        status: 'text-amber-800'
    },
    glass: {
        name: 'Glass',
        bg: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
        text: 'text-white',
        card: 'bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl',
        boardBorder: 'border-white/30',
        cell: {
            base: 'text-white bg-transparent hover:bg-white/10 focus:bg-white/20',
            prefilled: 'bg-white/30 text-white font-bold',
            selected: 'bg-white/50 text-white font-bold shadow-inner',
            highlighted: 'bg-white/20 text-white',
            border: 'border-white/20',
            borderBold: 'border-white/50'
        },
        button: 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 shadow-lg',
        status: 'text-white drop-shadow-md'
    }
};

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('glass');

    const value = {
        theme: themes[currentTheme],
        currentTheme,
        setTheme: setCurrentTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            <div className={`min-h-screen transition-colors duration-300 ${themes[currentTheme].bg} ${themes[currentTheme].text}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
