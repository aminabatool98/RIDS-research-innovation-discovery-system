import { motion } from "framer-motion";

export const Loader = ({ label = "Loading" }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-20 text-parchment/60">
    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-wheat"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
    <span className="font-mono text-xs uppercase tracking-[0.2em]">{label}</span>
  </div>
);

export const CardSkeleton = () => (
  <div className="animate-pulse rounded-lg border border-ink-line bg-ink-soft p-5">
    <div className="mb-4 h-3 w-16 rounded bg-ink-line" />
    <div className="mb-2 h-5 w-3/4 rounded bg-ink-line" />
    <div className="mb-1 h-3 w-full rounded bg-ink-line" />
    <div className="h-3 w-2/3 rounded bg-ink-line" />
  </div>
);
