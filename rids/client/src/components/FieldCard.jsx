import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const FieldCard = ({ field, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35, delay: (index % 10) * 0.04 }}
  >
    <Link
      to={`/fields/${field._id}`}
      className="focus-ring group block rounded-lg border border-ink-line bg-ink-soft px-5 py-6 text-center transition-colors hover:border-wheat/40"
    >
      <div
        className="mx-auto mb-3 h-2 w-2 rounded-full"
        style={{ backgroundColor: field.color || "#C9A227" }}
      />
      <h3 className="font-display text-base text-parchment group-hover:text-wheat">{field.name}</h3>
    </Link>
  </motion.div>
);
