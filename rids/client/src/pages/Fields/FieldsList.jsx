import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FieldCard } from "../../components/FieldCard";
import { CardSkeleton } from "../../components/Loader";
import { fetchFields } from "../../api/fieldApi";

export default function FieldsList() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetchFields({ limit: 50 }).then((d) => setItems(d.items)).catch(() => setItems([]));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-wheat/70">By knowledge area</span>
        <h1 className="mt-2 font-display text-3xl text-parchment sm:text-4xl">Fields</h1>
        <p className="mt-3 max-w-xl text-parchment/55">
          Ten fixed knowledge areas — the second dimension every paper is indexed by, independent of department.
        </p>
      </motion.div>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {items === null
          ? Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />)
          : items.map((f, i) => <FieldCard key={f._id} field={f} index={i} />)}
      </div>
    </div>
  );
}
