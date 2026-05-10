import { Link } from "react-router-dom";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { useState } from "react";

import ThemeSelector from "./ThemeSelector";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-(--bg-primary)/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}

        <Link to="/" className="text-3xl font-bold tracking-tight">
          Memoir
        </Link>

        {/* DESKTOP NAV */}

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className="transition-colors hover:text-(--accent)">
            Home
          </Link>

          <a
            href="#features"
            className="transition-colors hover:text-(--accent)"
          >
            Features
          </a>

          <Link to="/login" className="transition-colors hover:text-(--accent)">
            Login
          </Link>

          <Link to="/register">
            <button className="rounded-xl bg-(--accent) px-5 py-2.5 text-white transition hover:opacity-90">
              Get Started
            </button>
          </Link>

          <ThemeSelector />
        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl md:hidden"
        >
          {menuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </nav>

      {/* MOBILE MENU */}

      {menuOpen && (
        <div className="flex flex-col gap-5 border-t border-white/10 bg-(--bg-secondary) px-6 pb-6 md:hidden">
          <Link to="/">Home</Link>

          <a href="#features">Features</a>

          <Link to="/login">Login</Link>

          <Link to="/register">
            <button className="w-full rounded-xl bg-(--accent) py-3 text-white">
              Get Started
            </button>
          </Link>

          <ThemeSelector />
        </div>
      )}
    </header>
  );
}

export default Navbar;
