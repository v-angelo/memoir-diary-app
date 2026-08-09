export const moodMap = {
  happy: "😊",
  excited: "🤩",
  calm: "😌",
  productive: "💪",
  sad: "😔",
  angry: "😠",
  anxious: "😰",
};

export const formatTime = (time) => {
  if (!time) return "";

  const [hours, minutes] = time.split(":");

  return new Date(
    2000,
    0,
    1,
    Number(hours),
    Number(minutes),
  ).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
