import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const themes = [
  "light",
  "dark",
  "sepia",
  "forest",
  "lavender",
  "midnight",
  "coffee",
  "rose",
  "ocean",
];

const themeColors = {
  light: "#7c3aed",
  dark: "#8b5cf6",
  sepia: "#b7791f",
  forest: "#22c55e",
  lavender: "#a855f7",
  midnight: "#38bdf8",
  coffee: "#c08457",
  ocean: "#38bdf8",
  rose: "#f43f5e",
};

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const html = document.documentElement;

    html.classList.remove(...themes);

    html.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themes,
        themeColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
