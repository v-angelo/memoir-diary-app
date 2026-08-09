import { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";

import ThemeSelector from "./ThemeSelector";
import { ThemeContext, themeStyles } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { getInitials } from "../../utilities/journalUtils";

import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineUser,
  HiChevronDown,
} from "react-icons/hi2";

function DashboardNavbar() {
  const { theme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const colors = themeStyles[theme];
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
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
            to="/journal"
            className={`transition-colors hover:text-(--accent) ${
              location.pathname === "/journal" ? "text-(--accent)" : ""
            }`}
          >
            Journal
          </Link>
        </div>

        {/* right side */}
        <div className="flex items-center gap-4">
          <ThemeSelector />

          <div ref={menuRef} className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-(--bg-secondary)"
            >
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.username}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--accent) font-semibold text-white">
                  {getInitials(user?.username)}
                </div>
              )}

              <span className="hidden font-medium md:block">
                {user?.username}
              </span>

              <HiChevronDown />
            </button>

            {showMenu && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="absolute right-0 mt-3 w-52 overflow-hidden rounded-2xl border border-white/10 bg-(--bg-secondary) shadow-xl"
              >
                <Link
                  to="/profile"
                  onClick={() => setShowMenu(false)}
                  className="flex items-center gap-3 px-4 py-3 transition hover:bg-(--bg-primary)"
                >
                  <HiOutlineUser />
                  Profile
                </Link>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    logout();
                  }}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition hover:bg-(--bg-primary)"
                >
                  <HiOutlineArrowRightOnRectangle />
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </nav>
    </motion.header>
  );
}

export default DashboardNavbar;
