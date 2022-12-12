import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("lightMode");

  useEffect(() => {
    const prevMode = localStorage.getItem("themeMode");
    setDarkTheme(prevMode);
  }, []);

  const setDarkTheme = (themeMode) => {
    setThemeMode(themeMode);
    document.body.classList.add(themeMode);
    localStorage.setItem("themeMode", themeMode);
    if (themeMode === "darkMode") {
      document.body.classList.remove("lightMode");
    } else {
      document.body.classList.remove("darkMode");
    }
  };

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode: setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
