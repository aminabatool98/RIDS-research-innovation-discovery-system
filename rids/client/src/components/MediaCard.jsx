import { motion } from "framer-motion";
import { formatDate } from "../utils/formatDate";
import { ExternalLink } from "lucide-react";

export const MediaCard = ({ item, index = 0 }) => (
  <motion.a
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
    className="focus-ring group block rounded-lg border border-ink-line bg-ink-soft p-5 transition-colors hover:border-wheat/40"
  >
    <div className="flex items-center justify-between text-xs text-parchment/40">
      <span className="font-mono uppercase tracking-wide">{item.source}</span>
      <span>{formatDate(item.publishedDate)}</span>
    </div>
    <h3 className="mt-2 flex items-center gap-1.5 font-display text-lg text-parchment group-hover:text-wheat">
      {item.title}
      <ExternalLink className="h-3.5 w-3.5 opacity-50" />
    </h3>
    {item.summary && <p className="mt-2 text-sm text-parchment/55">{item.summary}</p>}
  </motion.a>
);
