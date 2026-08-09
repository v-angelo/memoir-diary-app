import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

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

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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

                  <HiChevronDown />
                </button>

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
                      <HiOutlineUser />
                      Profile
                    </Link>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        handleLogout();
                      }}
                      className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition hover:bg-(--bg-primary)"
                    >
                      🚪 Logout
                    </button>
                  </motion.div>
                )}
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
      {menuOpen && (
        <div className="flex flex-col gap-5 border-t border-white/10 bg-(--bg-secondary) px-6 pb-6 md:hidden">
          <Link to="/">Home</Link>

          <a href="#features">Features</a>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard">Dashboard</Link>

              <div className="flex items-center gap-3">
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
