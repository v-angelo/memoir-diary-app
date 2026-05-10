import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";

function ThemeSelector() {
  const { theme, setTheme, themes, themeColors } = useContext(ThemeContext);

  return (
    <div className="flex items-center gap-3">
      {/* ACTIVE THEME COLOR */}

      <div
        className="h-4 w-4 rounded-full border border-white/20"
        style={{
          backgroundColor: themeColors[theme],
        }}
      />

      {/* DROPDOWN */}

      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="cursor-pointer rounded-xl border border-white/10 bg-(--bg-secondary) px-3 py-2 text-(--text-primary) outline-none"
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ThemeSelector;
