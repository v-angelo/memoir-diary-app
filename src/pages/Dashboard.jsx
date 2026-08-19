import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { ThemeContext, themeStyles } from "../context/ThemeContext";
import DashboardNavbar from "../components/layout/DashboardNavbar";

import { HiOutlineBookOpen, HiOutlinePlus } from "react-icons/hi";

import { getEntriesAPI } from "../services/entryService";

import { calculateStreaks } from "../utilities/streakUtils";
import {
  moodMap,
  formatTime,
  getEntryPreview,
} from "../utilities/journalUtils";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const colors = themeStyles[theme];

  const [entries, setEntries] = useState([]);

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    currentStreak: 0,
    longestStreak: 0,
    mostCommonMood: null,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.entryDateTime) - new Date(a.entryDateTime),
  );

  const filteredEntries = sortedEntries.filter((entry) =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const displayedEntries = searchTerm.trim()
    ? filteredEntries
    : sortedEntries.slice(0, 5);

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

            {loading && (
              <div className="mt-4 flex items-center gap-3 text-sm text-(--text-secondary)">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-(--accent) border-t-transparent" />
                <span>Loading your memories...</span>
              </div>
            )}
          </motion.div>

          {/* stats */}
          {loading ? (
            <div className="mt-12 grid gap-6 md:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-36 animate-pulse rounded-3xl bg-(--bg-secondary)"
                />
              ))}
            </div>
          ) : (
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

                <div className="mt-3 flex items-center gap-3">
                  {stats.mostCommonMood ? (
                    <>
                      <span className="text-4xl">
                        {moodMap[stats.mostCommonMood]}
                      </span>

                      <span className="text-2xl font-bold capitalize">
                        {stats.mostCommonMood}
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold">—</span>
                  )}
                </div>
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
          )}

          {/* new entry link */}
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
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              {/* left side */}
              <div>
                <h2 className="text-3xl font-bold">
                  {searchTerm.trim() ? "Search Results" : "Recent Entries"}
                </h2>

                <p className="mt-2 text-(--text-secondary)">
                  {searchTerm.trim()
                    ? `Showing entries matching "${searchTerm}"`
                    : "Revisit your latest memories and reflections."}
                </p>
              </div>

              {/* right side */}
              <div className="flex items-center justify-center gap-4">
                <div className="relative">
                  <HiOutlineMagnifyingGlass className="absolute top-1/2 left-4 -translate-y-1/2 text-lg text-(--text-secondary)" />

                  <input
                    type="text"
                    placeholder="Search entries by Title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-(--bg-secondary) py-3 pr-5 pl-10 outline-none"
                  />
                </div>

                {entries.length > 0 && (
                  <div className="h-full min-w-25">
                    <motion.span
                      key={displayedEntries.length}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="rounded-xl bg-(--accent) px-4 py-3 text-sm font-semibold text-white"
                    >
                      {displayedEntries.length}{" "}
                      {displayedEntries.length === 1 ? "entry" : "entries"}
                    </motion.span>
                  </div>
                )}
              </div>
            </div>

            {loading ? (
              <div className="mt-6 space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="h-28 animate-pulse rounded-2xl bg-(--bg-secondary)"
                  />
                ))}
              </div>
            ) : entries.length === 0 ? (
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
            ) : displayedEntries.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 rounded-3xl bg-(--bg-secondary) p-12 text-center"
              >
                <h3 className="text-2xl font-bold">
                  No matching entries found
                </h3>

                <p className="mt-3 text-(--text-secondary)">
                  Try a different title or keyword.
                </p>
              </motion.div>
            ) : (
              <AnimatePresence>
                <div className="mt-6 space-y-4">
                  {displayedEntries.map((entry, index) => (
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
                      onClick={() =>
                        navigate("/journal", {
                          state: {
                            entryId: entry._id,
                            entry,
                          },
                        })
                      }
                      className="cursor-pointer rounded-2xl bg-(--bg-secondary) p-5 hover:ring hover:ring-(--accent)"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{entry.title}</h3>

                        <div className="text-right text-sm text-(--text-secondary)">
                          <p>
                            {new Date(entry.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>

                          <p>{formatTime(entry.time)}</p>
                        </div>
                      </div>

                      <p className="mt-2 line-clamp-2 text-(--text-secondary)">
                        {getEntryPreview(entry.content)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </motion.section>
        </div>
      </motion.main>
    </>
  );
}

export default Dashboard;
