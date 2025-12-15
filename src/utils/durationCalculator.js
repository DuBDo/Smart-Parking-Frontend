export const calculateDuration = (start, end) => {
  if (!start || !end) return { hours: 0, minutes: 0, totalMinutes: 0 };
  const startDate = new Date(start);
  const endDate = new Date(end);

  // If end is before start → invalid
  if (endDate < startDate) return null;

  const diffMs = endDate - startDate; // difference in milliseconds

  const totalMinutes = Math.floor(diffMs / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes, totalMinutes };
};
