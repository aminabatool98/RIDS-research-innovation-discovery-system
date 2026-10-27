import { motion } from "framer-motion";
import { formatDate } from "../utils/formatDate";
import { MapPin, Calendar } from "lucide-react";

export const EventCard = ({ event, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -12 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35, delay: (index % 8) * 0.04 }}
    className="flex gap-4 rounded-lg border border-ink-line bg-ink-soft p-5"
  >
    <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-md bg-moss/15 py-2 text-moss">
      <span className="font-display text-xl leading-none">{new Date(event.date).getDate()}</span>
      <span className="font-mono text-[10px] uppercase">
        {new Date(event.date).toLocaleString("en-US", { month: "short" })}
      </span>
    </div>
    <div>
      <h3 className="font-display text-lg text-parchment">{event.title}</h3>
      <p className="mt-1 text-sm text-parchment/55">{event.description}</p>
      <div className="mt-2 flex flex-wrap gap-3 text-xs text-parchment/40">
        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(event.date)}</span>
        {event.venue && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{event.venue}</span>}
      </div>
    </div>
  </motion.div>
);
