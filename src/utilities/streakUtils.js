export const calculateStreaks = (entries) => {
  if (!entries.length) {
    return {
      currentStreak: 0,
      longestStreak: 0,
    };
  }

  const uniqueDates = [
    ...new Set(
      entries.map(
        (entry) => new Date(entry.entryDateTime).toISOString().split("T")[0],
      ),
    ),
  ].sort((a, b) => new Date(a) - new Date(b));

  let longestStreak = 1;
  let currentRun = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1]);
    const curr = new Date(uniqueDates[i]);

    const diffDays = (curr - prev) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      currentRun++;
      longestStreak = Math.max(longestStreak, currentRun);
    } else {
      currentRun = 1;
    }
  }

  let currentStreak = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sortedDesc = [...uniqueDates].sort((a, b) => new Date(b) - new Date(a));

  let cursor = new Date(sortedDesc[0]);

  const diffFromToday = (today - cursor) / (1000 * 60 * 60 * 24);

  if (diffFromToday > 1) {
    currentStreak = 0;
  } else {
    currentStreak = 1;

    for (let i = 1; i < sortedDesc.length; i++) {
      const next = new Date(sortedDesc[i]);

      const diffDays = (cursor - next) / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        currentStreak++;
        cursor = next;
      } else {
        break;
      }
    }
  }

  return {
    currentStreak,
    longestStreak,
  };
};
