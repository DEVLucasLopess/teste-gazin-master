import { createContext, useCallback, useState, useMemo, useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { DarkTheme, LightTheme } from "../themes";
import { ReactNode } from "react";
import { Box } from "@mui/material";

interface ThemeContextData {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeConntext = createContext({} as ThemeContextData);

export const useAppThemeContext = () => {
  return useContext(ThemeConntext);
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const AppThemeProvider = ({ children }: ThemeProviderProps) => {

  const [themeName, setThemeName] = useState<"dark" | "light">("light");
  
  const toggleTheme = useCallback(() => {
    setThemeName((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const theme = useMemo(() => {
    if (themeName === "light") {
      return LightTheme;
    }
    return DarkTheme;
  }, [themeName]);

  return (
    <ThemeConntext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>{children}</Box>
      </ThemeProvider>
    </ThemeConntext.Provider>
  );
};
