import { motion } from "motion/react";
import {
  moodMap,
  formatTime,
  getEntryPreview,
} from "../../utilities/journalUtils";

function EntryCard({ entry, index, onClick }) {
  return (
    <motion.div
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
      onClick={() => onClick(entry)}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold">{entry?.title}</h3>

          {entry?.mood && (
            <span className="rounded-full bg-(--accent) px-2 py-1 text-xs text-white">
              {moodMap[entry.mood]}{" "}
              {entry.mood.charAt(0).toUpperCase() + entry?.mood.slice(1)}
            </span>
          )}
        </div>

        <span className="text-sm text-(--text-secondary)">
          {formatTime(entry?.time) ||
            new Date(entry.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
        </span>
      </div>

      <p className="mt-3 line-clamp-5 text-(--text-secondary) lg:line-clamp-3">
        {getEntryPreview(entry?.content)}
      </p>
    </motion.div>
  );
}

export default EntryCard;
