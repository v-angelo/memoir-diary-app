import { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

import ThemeSelector from "./ThemeSelector";
import { ThemeContext, themeStyles } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { getInitials } from "../../utilities/journalUtils";

import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineUser,
  HiChevronDown,
} from "react-icons/hi2";

import { HiOutlineMenu, HiX } from "react-icons/hi";

function DashboardNavbar() {
  const { theme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const colors = themeStyles[theme];
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

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
        <div className="hidden items-center gap-4 md:flex">
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
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-(--accent)"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--accent) font-semibold text-white">
                  {getInitials(user?.username)}
                </div>
              )}

              <span className="hidden font-medium md:block">
                {user?.username}
              </span>

              <motion.div
                animate={{
                  rotate: showMenu ? 180 : 0,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <HiChevronDown />
              </motion.div>
            </button>

            <AnimatePresence>
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
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-(--bg-secondary) shadow-xl"
                >
                  {/* user info */}
                  <div className="border-b border-white/10 px-4 py-3">
                    <p className="font-medium">{user?.username}</p>

                    <p className="truncate text-sm text-(--text-secondary)">
                      {user?.email}
                    </p>
                  </div>

                  {/* profile */}
                  <Link
                    to="/profile"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 transition hover:bg-(--bg-primary)"
                  >
                    <HiOutlineUser className="text-lg" />
                    Profile
                  </Link>

                  {/* logout */}
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      logout();
                    }}
                    className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition hover:bg-(--bg-primary)"
                  >
                    <HiOutlineArrowRightOnRectangle className="text-lg" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl md:hidden"
        >
          {menuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-(--bg-secondary) md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-5">
              <div className="mb-2 flex items-center gap-3">
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user.username}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--accent) font-semibold text-white">
                    {getInitials(user?.username)}
                  </div>
                )}

                <div>
                  <p className="font-medium">{user?.username}</p>
                  <p className="text-sm text-(--text-secondary)">
                    {user?.email}
                  </p>
                </div>
              </div>

              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className={
                  location.pathname === "/dashboard" ? "text-(--accent)" : ""
                }
              >
                Dashboard
              </Link>

              <Link
                to="/journal"
                onClick={() => setMenuOpen(false)}
                className={
                  location.pathname === "/journal" ? "text-(--accent)" : ""
                }
              >
                Journal
              </Link>

              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className={
                  location.pathname === "/profile" ? "text-(--accent)" : ""
                }
              >
                Profile
              </Link>

              <ThemeSelector />

              <button
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
                className="rounded-xl border border-(--accent) px-5 py-3 text-(--accent)"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default DashboardNavbar;
