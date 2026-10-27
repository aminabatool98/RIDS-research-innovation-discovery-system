import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { truncateText } from "../utils/truncateText";

export const ResearchCard = ({ paper, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
    whileHover={{ y: -4 }}
    className="group relative flex flex-col rounded-lg border border-ink-line bg-ink-soft p-5 shadow-card transition-colors hover:border-wheat/40"
  >
    <div className="mb-3 flex items-center justify-between">
      <span className="field-index font-mono text-[11px] text-parchment/40">
        {String(index + 1).padStart(3, "0")} · {paper.publishedYear}
      </span>
      {paper.isFeatured && (
        <span className="rounded-full bg-wheat/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-wheat">
          Featured
        </span>
      )}
    </div>
    <Link to={`/research/${paper._id}`} className="focus-ring">
      <h3 className="font-display text-lg leading-snug text-parchment group-hover:text-wheat">
        {paper.title}
      </h3>
    </Link>
    <p className="mt-2 text-sm text-parchment/60">{truncateText(paper.abstract, 140)}</p>
    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
      {paper.department?.name && (
        <span className="rounded-full border border-ink-line px-2 py-1 text-parchment/60">
          {paper.department.name}
        </span>
      )}
      {paper.field?.name && (
        <span className="rounded-full border border-moss/40 bg-moss/10 px-2 py-1 text-moss-deep text-moss">
          {paper.field.name}
        </span>
      )}
    </div>
  </motion.div>
);
