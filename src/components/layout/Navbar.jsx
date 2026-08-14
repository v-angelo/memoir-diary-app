import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

import {
  HiOutlineMenu,
  HiX,
  HiOutlineUser,
  HiChevronDown,
} from "react-icons/hi";

import { getInitials } from "../../utilities/journalUtils";

import ThemeSelector from "./ThemeSelector";
import { ThemeContext, themeStyles } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  const colors = themeStyles[theme];

  const { user, logout, isAuthenticated } = useContext(AuthContext);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
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
      className="sticky top-0 z-50 border-b border-(--text-secondary)/10 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
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

              {/* theme selector */}
              <ThemeSelector />

              <div ref={profileMenuRef} className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
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

                  <span className="hidden font-medium lg:block">
                    {user?.username}
                  </span>

                  <motion.div
                    animate={{
                      rotate: showProfileMenu ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <HiChevronDown />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-(--bg-secondary) shadow-xl"
                    >
                      <div className="border-b border-white/10 px-4 py-3">
                        <p className="font-medium">{user?.username}</p>

                        <p className="truncate text-sm text-(--text-secondary)">
                          {user?.email}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 transition hover:bg-(--bg-primary)"
                      >
                        <HiOutlineUser className="text-lg" />
                        Profile
                      </Link>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          handleLogout();
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

              {/* theme selector */}
              <ThemeSelector />
            </>
          )}
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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="overflow-hidden border-t border-white/10 bg-(--bg-secondary) md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-5">
              {isAuthenticated && (
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
              )}

              <Link
                to="/"
                className={location.pathname === "/" ? "text-(--accent)" : ""}
              >
                Home
              </Link>

              <a href="#features">Features</a>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className={
                      location.pathname === "/dashboard"
                        ? "text-(--accent)"
                        : ""
                    }
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/profile"
                    className={
                      location.pathname === "/profile" ? "text-(--accent)" : ""
                    }
                  >
                    Profile
                  </Link>

                  <ThemeSelector />

                  <button
                    onClick={handleLogout}
                    className="rounded-xl border border-(--accent) px-5 py-3 text-(--accent)"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={
                      location.pathname === "/login" ? "text-(--accent)" : ""
                    }
                  >
                    Login
                  </Link>

                  <Link to="/register">
                    <button className="w-full rounded-xl bg-(--accent) py-3 text-white">
                      Get Started
                    </button>
                  </Link>

                  <ThemeSelector />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
