import { useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HiOutlinePlus, HiOutlineBookOpen } from "react-icons/hi";

import JournalCalendar from "../components/layout/JournalCalendar";

import { ThemeContext, themeStyles } from "../context/ThemeContext";
import { getEntriesByDateAPI } from "../services/entryService";
import DashboardNavbar from "../components/layout/DashboardNavbar";
import EntryCard from "../components/layout/EntryCard";

function Journal() {
  const { theme } = useContext(ThemeContext);

  const colors = themeStyles[theme];

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [entries, setEntries] = useState([]);

  const [showEditor, setShowEditor] = useState(false);

  const [selectedEntry, setSelectedEntry] = useState(null);

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
        className=""
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
          <div className="mt-4 grid gap-6 lg:grid-cols-12">
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
              className="flex flex-col rounded-3xl bg-(--bg-secondary) p-6 lg:col-span-4 lg:h-140 2xl:h-160"
            >
              <h2 className="mb-4 text-2xl font-semibold">Calendar</h2>

              <div className="flex justify-center">
                <JournalCalendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  formatDate={formatDate}
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
              className="flex flex-col rounded-3xl bg-(--bg-secondary) p-6 lg:col-span-8 lg:h-140 2xl:h-160"
            >
              {/* top bar */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                {entries.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex h-full flex-col items-center justify-center text-center"
                  >
                    <HiOutlineBookOpen
                      className="mb-4 text-(--accent)"
                      size={64}
                    />

                    <h3 className="text-xl font-semibold">No entries yet</h3>

                    <p className="mt-2 max-w-sm text-(--text-secondary)">
                      No entries for this day Every memory starts with a single
                      page. Write your first entry and begin capturing the story
                      of this day.
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleCreateEntry}
                      className="mt-6 cursor-pointer rounded-xl bg-(--accent) px-5 py-3 font-medium text-white"
                    >
                      Create First Entry
                    </motion.button>
                  </motion.div>
                ) : (
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
                        <EntryCard
                          key={entry._id}
                          entry={entry}
                          index={index}
                          onClick={handleEditEntry}
                        />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                )}
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
