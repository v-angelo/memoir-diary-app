import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";

import ThemeSelector from "./ThemeSelector";
import { ThemeContext, themeStyles } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";

function DashboardNavbar() {
  const { theme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const colors = themeStyles[theme];
  const location = useLocation();

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

        {/* center nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/dashboard"
            className={`transition-colors hover:text-(--accent) ${
              location.pathname === "/dashboard" ? "text-(--accent)" : ""
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/entries"
            className={`transition-colors hover:text-(--accent) ${
              location.pathname === "/entries" ? "text-(--accent)" : ""
            }`}
          >
            My Entries
          </Link>
        </div>

        {/* right side */}
        <div className="flex items-center gap-4">
          <ThemeSelector />

          <div className="hidden text-right md:block">
            <p className="font-medium">{user?.username}</p>

            <p className="text-sm text-(--text-secondary)">{user?.email}</p>
          </div>

          <button
            onClick={logout}
            className="flex cursor-pointer items-center justify-center rounded-xl border border-(--accent) px-5 py-2.5 text-(--accent) transition hover:bg-(--accent) hover:text-white"
          >
            Logout
          </button>
        </div>
      </nav>
    </motion.header>
  );
}

export default DashboardNavbar;
