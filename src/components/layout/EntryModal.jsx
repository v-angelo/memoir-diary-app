import { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { ThemeContext, themeStyles } from "../../context/ThemeContext";
import { formatTime, moodMap } from "../../utilities/journalUtils";

function EntryModal({
  isOpen,
  entry,
  selectedDate,
  onClose,
  onSave,
  onDelete,
}) {
  const { theme } = useContext(ThemeContext);

  const colors = themeStyles[theme];

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    mood: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (entry) {
      setFormData({
        title: entry.title || "",
        content: entry.content || "",
        mood: entry.mood || "",
        date: entry.date?.split("T")[0] || "",
        time: entry.time || "",
      });

      setIsEditing(false);
    } else {
      setFormData({
        title: "",
        content: "",
        mood: "",
        date: selectedDate.toISOString().split("T")[0],
        time: new Date().toTimeString().slice(0, 5),
      });

      setIsEditing(true);
    }
  }, [entry, selectedDate, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                backgroundColor: colors.bgSecondary,
                color: colors.textPrimary,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-3xl p-6 shadow-2xl"
            >
              {/* header */}
              <div
                className={`${isEditing ? "mb-6" : "mb-0"} flex items-center justify-between`}
              >
                <div>
                  <div>
                    {isEditing && (
                      <>
                        <h2 className="text-2xl font-bold">
                          {entry ? "Edit Memory" : "New Memory"}
                        </h2>

                        <p className="text-(--text-secondary)">
                          Capture moments worth remembering.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="cursor-pointer text-2xl text-(--text-secondary)"
                >
                  ×
                </button>
              </div>

              {/* body */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={isEditing ? "edit" : "view"}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -15,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="flex-1 overflow-y-auto"
                >
                  {/* metadata display */}
                  {entry && !isEditing && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {formData.mood && (
                        <span className="rounded-full bg-(--accent) px-3 py-1 text-sm text-white">
                          {moodMap[formData.mood]}{" "}
                          {formData.mood.charAt(0).toUpperCase() +
                            formData.mood.slice(1)}
                        </span>
                      )}

                      <span className="rounded-full bg-(--bg-primary) px-3 py-1 text-sm text-(--text-secondary)">
                        📅{" "}
                        {new Date(formData.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>

                      <span className="rounded-full bg-(--bg-primary) px-3 py-1 text-sm text-(--text-secondary)">
                        🕒 {formatTime(formData.time)}
                      </span>
                    </div>
                  )}

                  {/* title */}
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: e.target.value,
                        })
                      }
                      placeholder="Entry title..."
                      className="mb-4 w-full rounded-2xl border border-white/10 bg-(--bg-primary) px-4 py-3 outline-none"
                    />
                  ) : (
                    <h1 className="mb-4 text-3xl font-bold tracking-tight">
                      {formData.title}
                    </h1>
                  )}

                  {/* mood + time row */}
                  {isEditing ? (
                    <div className="mb-4 grid gap-4 md:grid-cols-3">
                      <select
                        value={formData.mood}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mood: e.target.value,
                          })
                        }
                        className="rounded-2xl border border-white/10 bg-(--bg-primary) px-4 py-3 outline-none"
                      >
                        <option value="">Select Mood</option>
                        <option value="happy">😊 Happy</option>
                        <option value="excited">🤩 Excited</option>
                        <option value="calm">😌 Calm</option>
                        <option value="productive">💪 Productive</option>
                        <option value="sad">😔 Sad</option>
                        <option value="angry">😠 Angry</option>
                        <option value="anxious">😰 Anxious</option>
                      </select>

                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            date: e.target.value,
                          })
                        }
                        className="rounded-2xl border border-white/10 bg-(--bg-primary) px-4 py-3 outline-none"
                      />

                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            time: e.target.value,
                          })
                        }
                        className="rounded-2xl border border-white/10 bg-(--bg-primary) px-4 py-3 outline-none"
                      />
                    </div>
                  ) : null}

                  {/* content */}
                  {isEditing ? (
                    <textarea
                      rows={12}
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          content: e.target.value,
                        })
                      }
                      placeholder="What's on your mind today?"
                      className="w-full rounded-2xl border border-white/10 bg-(--bg-primary) px-4 py-3 outline-none"
                    />
                  ) : (
                    <div className="prose prose-invert max-w-none">
                      <p className="leading-8 whitespace-pre-wrap text-(--text-primary)">
                        {formData.content}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* footer */}
              <div className="mt-6 flex flex-wrap justify-end gap-3">
                {entry && !isEditing && (
                  <>
                    <button
                      onClick={() => onDelete(entry)}
                      className="cursor-pointer rounded-xl border border-red-500 px-4 py-2 text-red-500 transition hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => setIsEditing(true)}
                      className="cursor-pointer rounded-xl border border-(--accent) px-4 py-2 text-(--accent) transition hover:bg-(--accent) hover:text-white"
                    >
                      Edit
                    </button>
                  </>
                )}

                {isEditing && (
                  <>
                    <button
                      onClick={onClose}
                      className="cursor-pointer rounded-xl border border-(--accent) px-5 py-3 text-(--accent)"
                    >
                      Cancel
                    </button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onSave(formData)}
                      className="cursor-pointer rounded-xl bg-(--accent) px-6 py-3 font-medium text-white"
                    >
                      Save Entry
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default EntryModal;
