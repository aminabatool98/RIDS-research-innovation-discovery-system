export const truncateText = (text = "", max = 160) =>
  text.length > max ? `${text.slice(0, max).trim()}…` : text;
