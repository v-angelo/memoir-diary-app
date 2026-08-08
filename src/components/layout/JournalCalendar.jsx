import { DayPicker } from "react-day-picker";
import { motion } from "motion/react";

import "react-day-picker/dist/style.css";

function JournalCalendar({
  selectedDate,
  setSelectedDate,
  formatDate,
  className = "",
}) {
  const entryDates = [];

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.3,
      }}
      className="memoir-calendar"
    >
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && setSelectedDate(date)}
        modifiers={{
          hasEntry: (date) => entryDates.includes(formatDate(date)),
        }}
        modifiersClassNames={{
          hasEntry: "has-entry",
        }}
        animate
        showOutsideDays
      />
    </motion.div>
  );
}

export default JournalCalendar;
