const formatBookingDate = (date, type = "date-time-formator") => {
  if (!date) return "";
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  const isTomorrow = (() => {
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    return date.toDateString() === tomorrow.toDateString();
  })();

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (type === "date-formator") {
    if (isToday) return `Today`;
    if (isTomorrow) return `Tomorrow`;
  } else {
    if (isToday) return `Today at ${time}`;
    if (isTomorrow) return `Tomorrow at ${time}`;
  }

  // For future dates → 10th December, 5th March, etc.
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return type == "date-time-formator"
    ? `${day}${suffix} ${month} at ${time}`
    : `${day}${suffix} ${month} `;
};

export default formatBookingDate;
