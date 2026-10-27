import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const DepartmentCard = ({ department, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
  >
    <Link
      to={`/departments/${department._id}`}
      className="focus-ring group block h-full rounded-lg border border-ink-line bg-ink-soft p-6 transition-colors hover:border-wheat/40"
    >
      <span className="field-index font-mono text-xs text-wheat/70">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-3 font-display text-xl text-parchment group-hover:text-wheat">{department.name}</h3>
      <p className="mt-2 text-sm text-parchment/55">{department.description}</p>
    </Link>
  </motion.div>
);
