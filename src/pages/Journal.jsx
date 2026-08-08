import { useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HiOutlinePlus, HiOutlineBookOpen } from "react-icons/hi";

import JournalCalendar from "../components/layout/JournalCalendar";

import { ThemeContext, themeStyles } from "../context/ThemeContext";
import { getEntriesByDateAPI } from "../services/entryService";
import DashboardNavbar from "../components/layout/DashboardNavbar";

function Journal() {
  const { theme } = useContext(ThemeContext);

  const colors = themeStyles[theme];

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [entries, setEntries] = useState([]);

  const [showEditor, setShowEditor] = useState(false);

  const [selectedEntry, setSelectedEntry] = useState(null);

  const moodMap = {
    happy: "😊",
    excited: "🤩",
    calm: "😌",
    productive: "💪",
    sad: "😔",
    angry: "😠",
    anxious: "😰",
  };

  useEffect(() => {
    loadEntries();
  }, [selectedDate]);

  const loadEntries = async () => {
    try {
      const formattedDate = formatDate(selectedDate);

      const response = await getEntriesByDateAPI(formattedDate);

      // console.log(response.data);

      setEntries(response.data || []);
    } catch (error) {
      setEntries([]);
    }
  };

  const handleCreateEntry = () => {
    setSelectedEntry(null);
    setShowEditor(true);
  };

  const handleEditEntry = (entry) => {
    setSelectedEntry(entry);
    setShowEditor(true);
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

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
        className="lg:h-[calc(100vh-80px)] lg:overflow-hidden"
      >
        <div className="mx-auto flex h-full max-w-7xl flex-col px-6 py-6">
          {/* header */}
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <h1 className="text-4xl font-bold">Journal</h1>

            <p className="mt-2 text-(--text-secondary)">
              Browse memories, reflect on moments, and keep writing your story.
            </p>
          </motion.div>

          {/* main layout */}
          <div className="mt-4 grid min-h-0 flex-1 gap-6 lg:grid-cols-12">
            {/* calendar panel */}
            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.1,
              }}
              className="flex flex-col overflow-hidden rounded-3xl bg-(--bg-secondary) p-6 lg:col-span-4"
            >
              <h2 className="mb-4 text-xl font-semibold">Calendar</h2>

              <div className="flex justify-center overflow-hidden">
                <JournalCalendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
            </motion.div>

            {/* entries panel */}
            <motion.div
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="flex min-h-0 flex-col overflow-hidden rounded-3xl bg-(--bg-secondary) p-6 lg:col-span-8"
            >
              {/* top bar */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {selectedDate.toDateString()}
                  </h2>

                  <p className="text-(--text-secondary)">
                    {entries.length} entries
                  </p>
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={handleCreateEntry}
                  className="flex cursor-pointer items-center gap-2 rounded-xl bg-(--accent) px-5 py-3 font-medium text-white"
                >
                  <HiOutlinePlus />
                  New Entry
                </motion.button>
              </div>

              {/* entries list */}
              <div className="mt-6 flex-1 overflow-y-auto p-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedDate.toDateString()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-4"
                  >
                    {entries.map((entry, index) => (
                      <motion.div
                        key={entry._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{
                          boxShadow: "inset 0 0 0 1px var(--accent)",
                        }}
                        transition={{
                          opacity: {
                            duration: 0.25,
                            delay: index * 0.05,
                          },
                          y: {
                            duration: 0.25,
                            delay: index * 0.05,
                          },
                          boxShadow: {
                            duration: 0.08,
                          },
                        }}
                        className="cursor-pointer rounded-2xl border border-transparent bg-(--bg-primary) p-5"
                        onClick={() => handleEditEntry(entry)}
                      >
                        {/* header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">
                              {entry.title}
                            </h3>

                            {entry.mood && (
                              <span className="rounded-full bg-(--accent) px-2 py-1 text-xs text-white">
                                {moodMap[entry.mood]}{" "}
                                {entry.mood.charAt(0).toUpperCase() +
                                  entry.mood.slice(1)}
                              </span>
                            )}
                          </div>

                          <span className="text-sm text-(--text-secondary)">
                            {new Date(entry.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        {/* content */}
                        <p className="mt-3 line-clamp-3 text-(--text-secondary)">
                          {entry.content}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* editor modal */}
          {showEditor && <div className="hidden">Editor Modal Placeholder</div>}
        </div>
      </motion.main>
    </>
  );
}

export default Journal;
