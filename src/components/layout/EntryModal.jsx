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
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {!entry
                      ? "New Memory"
                      : isEditing
                        ? "Edit Memory"
                        : "Memory Details"}
                  </h2>

                  <p className="text-(--text-secondary)">
                    Capture moments worth remembering.
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="cursor-pointer text-2xl text-(--text-secondary)"
                >
                  ×
                </button>
              </div>

              {/* body */}
              <div className="flex-1 overflow-y-auto">
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
                      🕒 {formatTime(formData.time)}
                    </span>
                  </div>
                )}

                {/* title */}
                <input
                  type="text"
                  disabled={!isEditing}
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

                {/* mood + time row */}
                <div className="mb-4 grid gap-4 sm:grid-cols-2">
                  <select
                    disabled={!isEditing}
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
                    type="time"
                    disabled={!isEditing}
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

                {/* content */}
                <textarea
                  rows={12}
                  disabled={!isEditing}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      content: e.target.value,
                    })
                  }
                  placeholder="What's on your mind today?"
                  className="w-full rounded-2xl border border-white/10 bg-(--bg-primary) px-4 py-3 outline-none disabled:cursor-default disabled:opacity-80"
                />
              </div>

              {/* footer */}
              <div className="mt-6 flex flex-wrap justify-end gap-3">
                {entry && !isEditing && (
                  <>
                    <button
                      onClick={() => onDelete(entry)}
                      className="cursor-pointer rounded-xl border border-red-500 px-5 py-3 text-red-500"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => setIsEditing(true)}
                      className="cursor-pointer rounded-xl border border-(--accent) px-5 py-3 text-(--accent)"
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
