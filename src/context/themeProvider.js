import { createContext, useState, useContext } from 'react';
import { darkTheme, lightTheme } from "../theme/theme"
import { ThemeProvider as StyledProvider } from 'styled-components';

const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
    const LocalTheme = window.localStorage.getItem('theme') || 'light';
    const [themeMode, setThemeMode] = useState(LocalTheme);
    const themeObject = themeMode === 'light' ? lightTheme : darkTheme;
    return (
        <ThemeContext.Provider value={{themeMode, setThemeMode }}>
            <StyledProvider theme={themeObject}>
                {children}
            </StyledProvider>
        </ThemeContext.Provider>
    )
}

function useTheme (){
    const context = useContext(ThemeContext);
    const { themeMode, setThemeMode } = context;
    const toggleTheme = () => {
        if (themeMode === "light") {
            setThemeMode("dark");
            window.localStorage.setItem('theme', 'dark');
        }
        else {
            setThemeMode("light")
            window.localStorage.setItem('theme', 'light');
        };
    }
    return [themeMode, toggleTheme];
}



export { ThemeProvider, useTheme };

export default ThemeProvider