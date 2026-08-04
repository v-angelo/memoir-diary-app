import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { useContext, useState } from "react";
import { motion } from "motion/react";

import ThemeSelector from "./ThemeSelector";
import { ThemeContext, themeStyles } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { theme } = useContext(ThemeContext);

  const colors = themeStyles[theme];

  const { user, logout, isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("See you soon 👋");

    setTimeout(() => {
      logout();
      navigate("/");
    }, 1000);
  };

  return (
    <motion.header
      animate={{
        backgroundColor: colors.bgPrimary,
        color: colors.textPrimary,
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* logo */}
        <Link to="/" className="text-3xl font-bold tracking-tight">
          Memoir
        </Link>

        {/* desktop nav */}
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

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="transition-colors hover:text-(--accent)"
              >
                Dashboard
              </Link>

              <span className="text-sm text-(--text-secondary)">
                Hello, {user?.username}
              </span>

              <button
                onClick={handleLogout}
                className="flex cursor-pointer items-center justify-center rounded-xl border border-(--accent) px-5 py-2.5 leading-none text-(--accent) transition hover:bg-(--accent) hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="transition-colors hover:text-(--accent)"
              >
                Login
              </Link>

              <Link to="/register">
                <button className="cursor-pointer rounded-xl bg-(--accent) px-5 py-2.5 text-white transition hover:opacity-90">
                  Get Started
                </button>
              </Link>
            </>
          )}

          <ThemeSelector />
        </div>

        {/* mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl md:hidden"
        >
          {menuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </nav>

      {/* mobile menu */}
      {menuOpen && (
        <div className="flex flex-col gap-5 border-t border-white/10 bg-(--bg-secondary) px-6 pb-6 md:hidden">
          <Link to="/">Home</Link>

          <a href="#features">Features</a>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard">Dashboard</Link>

              <span className="text-(--text-secondary)">
                Hello, {user?.username}
              </span>

              <button
                onClick={handleLogout}
                className="flex cursor-pointer items-center justify-center rounded-xl border border-(--accent) px-5 py-2.5 leading-none text-(--accent) transition hover:bg-(--accent) hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>

              <Link to="/register">
                <button className="w-full rounded-xl bg-(--accent) py-3 text-white">
                  Get Started
                </button>
              </Link>
            </>
          )}

          <ThemeSelector />
        </div>
      )}
    </motion.header>
  );
}

export default Navbar;
