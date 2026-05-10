import { Link } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-stone-200 px-6 py-4 dark:border-gray-700">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        Memoir
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/login" className="transition-colors hover:text-violet-500">
          Login
        </Link>

        <Link to="/register">
          <button className="rounded-lg bg-violet-600 px-4 py-2 text-white transition-colors hover:bg-violet-700">
            Sign Up
          </button>
        </Link>

        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
