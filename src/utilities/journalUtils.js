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

export const getInitials = (name = "") => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};
