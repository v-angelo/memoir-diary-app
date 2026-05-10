import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const themeStyles = {
  light: {
    bgPrimary: "#f8f5f2",
    bgSecondary: "#ffffff",

    textPrimary: "#1f2937",
    textSecondary: "#4b5563",

    accent: "#7c3aed",
  },

  dark: {
    bgPrimary: "#050505",
    bgSecondary: "#0f0f0f",

    textPrimary: "#f5f5f5",
    textSecondary: "#a1a1aa",

    accent: "#ff7b00",
  },

  sepia: {
    bgPrimary: "#f4ecd8",
    bgSecondary: "#fffaf0",

    textPrimary: "#5b4636",
    textSecondary: "#7a5c46",

    accent: "#b7791f",
  },

  forest: {
    bgPrimary: "#0f1720",
    bgSecondary: "#1b2a24",

    textPrimary: "#e5f3ea",
    textSecondary: "#b7d4c0",

    accent: "#22c55e",
  },

  sunset: {
    bgPrimary: "#1e1b2e",
    bgSecondary: "#2a243d",

    textPrimary: "#fdf2f8",
    textSecondary: "#f9a8d4",

    accent: "#fb7185",
  },

  midnight: {
    bgPrimary: "#0b1120",
    bgSecondary: "#111827",

    textPrimary: "#e2e8f0",
    textSecondary: "#94a3b8",

    accent: "#38bdf8",
  },

  coffee: {
    bgPrimary: "#2b2118",
    bgSecondary: "#3a2d22",

    textPrimary: "#f5e6d3",
    textSecondary: "#d6bfa7",

    accent: "#c08457",
  },

  ocean: {
    bgPrimary: "#082f49",
    bgSecondary: "#0c4a6e",

    textPrimary: "#e0f2fe",
    textSecondary: "#bae6fd",

    accent: "#38bdf8",
  },

  rose: {
    bgPrimary: "#fff1f2",
    bgSecondary: "#ffe4e6",

    textPrimary: "#881337",
    textSecondary: "#9f1239",

    accent: "#f43f5e",
  },

  matrix: {
    bgPrimary: "#020617",
    bgSecondary: "#0f172a",

    textPrimary: "#dcfce7",
    textSecondary: "#86efac",

    accent: "#39ff14",
  },
};

const themes = [
  "light",
  "dark",
  "sepia",
  "forest",
  "sunset",
  "midnight",
  "coffee",
  "rose",
  "ocean",
  "matrix",
];

const themeColors = {
  light: "#7c3aed",
  dark: "#ff7b00",
  sepia: "#b7791f",
  forest: "#22c55e",
  sunset: "#fb7185",
  midnight: "#38bdf8",
  coffee: "#c08457",
  ocean: "#38bdf8",
  rose: "#f43f5e",
  matrix: "#39ff14",
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
