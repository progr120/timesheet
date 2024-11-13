import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('@timesheet:theme');
        return savedTheme || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('@timesheet:theme', theme);
        
        if (theme === 'dark') {
            document.body.style.backgroundColor = '#2d2d2d';
            document.body.style.color = '#ffffff';
        } else {
            document.body.style.backgroundColor = '#f5f5f5';
            document.body.style.color = '#333333';
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
    }
    return context;
}