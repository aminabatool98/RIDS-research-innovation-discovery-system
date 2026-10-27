import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const HeroSection = ({ stats }) => (
  <section className="relative overflow-hidden border-b border-ink-line">
    <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
      <svg width="100%" height="100%">
        <pattern id="rows" width="100%" height="42" patternUnits="userSpaceOnUse">
          <line x1="0" y1="41.5" x2="100%" y2="41.5" stroke="#C9A227" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#rows)" />
      </svg>
    </div>

    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-32"
    >
      <motion.span
        variants={item}
        className="inline-block rounded-full border border-wheat/30 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-wheat"
      >
        Research Information Discovery System
      </motion.span>

      <motion.h1
        variants={item}
        className="mt-6 font-display text-4xl font-medium leading-[1.1] text-parchment sm:text-6xl"
      >
        Every paper this university
        <br className="hidden sm:block" /> has produced — <span className="italic text-wheat">catalogued, cross-indexed,</span> discoverable.
      </motion.h1>

      <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-base text-parchment/60">
        Browse by department or by field of knowledge, meet the faculty behind the work, and ask
        the assistant to point you straight to what matters.
      </motion.p>

      <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/research"
          className="focus-ring group flex items-center gap-2 rounded-full bg-wheat px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.02]"
        >
          Browse research
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          to="/fields"
          className="focus-ring rounded-full border border-ink-line px-6 py-3 text-sm font-medium text-parchment/80 hover:border-wheat/40"
        >
          Explore by field
        </Link>
      </motion.div>

      {stats && (
        <motion.div
          variants={item}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-ink-line bg-ink-line sm:grid-cols-4"
        >
          {[
            { label: "Papers", value: stats.papers },
            { label: "Departments", value: stats.departments },
            { label: "Fields", value: stats.fields },
            { label: "Faculty", value: stats.faculty },
          ].map((s) => (
            <div key={s.label} className="bg-ink-soft px-4 py-5">
              <div className="field-index font-mono text-2xl text-wheat">{s.value ?? "—"}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wide text-parchment/40">{s.label}</div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  </section>
);
