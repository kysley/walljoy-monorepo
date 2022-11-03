import {createContext, ReactNode} from 'react';

export const ThemeContext = createContext({});

type ThemeContextProps = {
  children: ReactNode;
  theme: any;
};
export const ThemeProvider = ({children, theme}: ThemeContextProps) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);
