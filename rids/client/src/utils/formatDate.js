export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
