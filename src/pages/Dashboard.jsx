import { useContext } from "react";
import { motion } from "motion/react";
import { HiOutlineBookOpen, HiOutlinePlus } from "react-icons/hi";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { ThemeContext, themeStyles } from "../context/ThemeContext";
import DashboardNavbar from "../components/layout/DashboardNavbar";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const colors = themeStyles[theme];

  return (
    <>
      <DashboardNavbar />

      <motion.main
        animate={{
          backgroundColor: colors.bgPrimary,
          color: colors.textPrimary,
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="z-0 min-h-screen"
      >
        <div className="mx-auto max-w-6xl px-6 py-12">
          {/* header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold tracking-[0.2em] text-(--accent) uppercase">
              Welcome Back
            </p>

            <h1 className="mt-3 text-5xl font-bold tracking-tight">
              Hello,
              <span className="text-(--accent)">
                {" "}
                {user?.username || "Writer"}
              </span>
              👋
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-(--text-secondary)">
              Capture your thoughts, reflections, and moments before they fade
              away.
            </p>
          </motion.div>

          {/* stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-12 grid gap-6 md:grid-cols-3"
          >
            <div className="rounded-3xl bg-(--bg-secondary) p-6">
              <h3 className="text-(--text-secondary)">Entries</h3>

              <p className="mt-3 text-4xl font-bold">0</p>
            </div>

            <div className="rounded-3xl bg-(--bg-secondary) p-6">
              <h3 className="text-(--text-secondary)">Current Theme</h3>

              <p className="mt-3 text-4xl font-bold capitalize">{theme}</p>
            </div>

            <div className="rounded-3xl bg-(--bg-secondary) p-6">
              <h3 className="text-(--text-secondary)">Writing Streak</h3>

              <p className="mt-3 text-4xl font-bold">0</p>
            </div>
          </motion.div>

          {/* new entry cta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-10"
          >
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 rounded-2xl bg-(--accent) px-6 py-4 font-semibold text-white"
            >
              <HiOutlinePlus />
              New Entry
            </Link>
          </motion.div>

          {/* recent entries */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold">Recent Entries</h2>

            <div className="mt-6 rounded-3xl bg-(--bg-secondary) p-12 text-center">
              <HiOutlineBookOpen className="mx-auto text-6xl text-(--accent)" />

              <h3 className="mt-6 text-2xl font-bold">
                Your story starts here
              </h3>

              <p className="mt-3 text-(--text-secondary)">
                You don't have any memoir entries yet.
              </p>

              <Link
                to="/journal"
                className="mt-6 inline-flex rounded-2xl bg-(--accent) px-5 py-3 font-medium text-white"
              >
                Write First Entry
              </Link>
            </div>
          </motion.section>
        </div>
      </motion.main>
    </>
  );
}

export default Dashboard;
