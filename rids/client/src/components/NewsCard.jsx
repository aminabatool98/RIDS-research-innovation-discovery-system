import { motion } from "framer-motion";
import { formatDate } from "../utils/formatDate";
import { truncateText } from "../utils/truncateText";

export const NewsCard = ({ item, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
    className="rounded-lg border border-ink-line bg-ink-soft p-5"
  >
    <span className="font-mono text-xs text-parchment/40">{formatDate(item.publishedDate)}</span>
    <h3 className="mt-2 font-display text-lg text-parchment">{item.title}</h3>
    <p className="mt-2 text-sm text-parchment/55">{truncateText(item.content, 180)}</p>
  </motion.div>
);
