import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";

function ThemeSelector() {
  const { theme, setTheme, themes, themeColors } = useContext(ThemeContext);

  const { isAuthenticated } = useContext(AuthContext);

  const publicThemes = ["light", "dark"];

  // get system theme
  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  useEffect(() => {
    if (!isAuthenticated && !publicThemes.includes(theme)) {
      console.log("Switching to system theme");

      setTheme(getSystemTheme());
    }
  }, [isAuthenticated, theme]);

  const handleThemeChange = (selectedTheme) => {
    const isLocked = !isAuthenticated && !publicThemes.includes(selectedTheme);

    if (isLocked) {
      toast.info("Register & Login to unlock all Memoir themes ✨");

      return;
    }

    setTheme(selectedTheme);
  };

  return (
    <div className="flex items-center gap-2">
      {/* active theme color*/}
      <div
        className="h-4 w-4 rounded-full border border-white/20"
        style={{
          backgroundColor: themeColors[theme],
        }}
      />

      {/* dropdown */}
      <select
        value={theme}
        onChange={(e) => handleThemeChange(e.target.value)}
        className="min-w-0 cursor-pointer rounded-xl border border-white/10 bg-(--bg-secondary) px-3 py-2 text-(--text-primary) outline-none"
      >
        <optgroup label="Free Themes">
          {publicThemes.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </optgroup>

        <optgroup
          label={isAuthenticated ? "Premium Themes" : "Premium Themes 🔒"}
        >
          {themes
            .filter((t) => !publicThemes.includes(t))
            .map((t) => (
              <option key={t} value={t}>
                {isAuthenticated
                  ? t.charAt(0).toUpperCase() + t.slice(1)
                  : `🔒 ${t.charAt(0).toUpperCase() + t.slice(1)}`}
              </option>
            ))}
        </optgroup>
      </select>
    </div>
  );
}

export default ThemeSelector;
