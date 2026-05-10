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
    bgPrimary: "#111827",
    bgSecondary: "#1f2937",

    textPrimary: "#f9fafb",
    textSecondary: "#d1d5db",

    accent: "#8b5cf6",
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

  lavender: {
    bgPrimary: "#f5f3ff",
    bgSecondary: "#ffffff",

    textPrimary: "#44337a",
    textSecondary: "#6b46c1",

    accent: "#a855f7",
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
};

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
