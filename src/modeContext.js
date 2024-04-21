import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "light",
});

export default function ColorContextProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setDarkMode(!darkMode);
      },
    }),
    [darkMode]
  );

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
