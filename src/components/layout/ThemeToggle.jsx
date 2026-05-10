import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";

import { FaMoon, FaSun } from "react-icons/fa";

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-200 transition-all duration-300 hover:scale-105 dark:bg-gray-700"
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}

export default ThemeToggle;
