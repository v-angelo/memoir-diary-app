import { useState, useContext, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { ThemeContext, themeStyles } from "../context/ThemeContext";
import DashboardNavbar from "../components/layout/DashboardNavbar";

import { HiOutlineBookOpen, HiOutlinePlus } from "react-icons/hi";

import { getEntriesAPI } from "../services/entryService";

import { calculateStreaks } from "../utilities/streakUtils";
import { moodMap, formatTime } from "../utilities/journalUtils";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const colors = themeStyles[theme];

  const [entries, setEntries] = useState([]);

  const [stats, setStats] = useState({
    currentStreak: 0,
    longestStreak: 0,
    mostCommonMood: null,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await getEntriesAPI();

      const allEntries = response.data || [];

      setEntries(allEntries);

      const moodCounts = {};

      allEntries.forEach((entry) => {
        if (!entry.mood) return;

        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
      });

      const mostCommonMood =
        Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

      const { currentStreak, longestStreak } = calculateStreaks(allEntries);

      setStats({
        currentStreak,
        longestStreak,
        mostCommonMood,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const recentEntries = [...entries]
    .sort((a, b) => new Date(b.entryDateTime) - new Date(a.entryDateTime))
    .slice(0, 5);

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
            className="mt-12 grid gap-6 md:grid-cols-4"
          >
            <div className="rounded-3xl bg-(--bg-secondary) p-6">
              <h3 className="text-(--text-secondary)">Entries</h3>

              <p className="mt-3 text-4xl font-bold">{entries.length}</p>
            </div>

            <div className="rounded-3xl bg-(--bg-secondary) p-6">
              <h3 className="text-(--text-secondary)">Favorite Mood</h3>

              <p className="mt-3 text-4xl font-bold">
                {stats.mostCommonMood
                  ? `${moodMap[stats.mostCommonMood]}`
                  : "—"}
              </p>
            </div>

            <div className="rounded-3xl bg-(--bg-secondary) p-6">
              <h3 className="text-(--text-secondary)">Current Streak</h3>

              <p className="mt-3 flex items-center gap-2 text-4xl font-bold">
                🔥 {stats.currentStreak}
              </p>
            </div>

            <div className="rounded-3xl bg-(--bg-secondary) p-6">
              <h3 className="text-(--text-secondary)">Longest Streak</h3>

              <p className="mt-3 flex items-center gap-2 text-4xl font-bold">
                🏆 {stats.longestStreak}
              </p>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-16"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-3xl font-bold">Recent Entries</h2>

                <p className="mt-2 text-(--text-secondary)">
                  Revisit your latest memories and reflections.
                </p>
              </div>

              {entries.length > 0 && (
                <span className="self-start rounded-xl bg-(--accent) px-4 py-2 text-sm font-semibold text-white sm:self-auto">
                  {recentEntries.length} entries
                </span>
              )}
            </div>

            {recentEntries.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-6 rounded-3xl bg-(--bg-secondary) p-12 text-center"
              >
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
              </motion.div>
            ) : (
              <div className="mt-6 space-y-4">
                {recentEntries.map((entry, index) => (
                  <motion.div
                    key={entry._id}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.45 + index * 0.05,
                    }}
                    className="rounded-2xl bg-(--bg-secondary) p-5"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{entry.title}</h3>

                      <span className="text-sm text-(--text-secondary)">
                        {formatTime(entry.time)}
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-(--text-secondary)">
                      {entry.content}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        </div>
      </motion.main>
    </>
  );
}

export default Dashboard;
