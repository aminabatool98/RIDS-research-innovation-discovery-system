import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const FacultyCard = ({ faculty, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
  >
    <Link
      to={`/faculty/${faculty._id}`}
      className="focus-ring group flex h-full flex-col items-center rounded-lg border border-ink-line bg-ink-soft p-6 text-center transition-colors hover:border-wheat/40"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-moss/20 font-display text-xl text-moss">
        {faculty.name?.charAt(0)}
      </div>
      <h3 className="font-display text-base text-parchment group-hover:text-wheat">{faculty.name}</h3>
      <p className="mt-1 text-xs text-parchment/50">{faculty.designation}</p>
      <p className="mt-1 text-xs text-wheat/70">{faculty.department?.name}</p>
    </Link>
  </motion.div>
);
