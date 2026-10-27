import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DepartmentCard } from "../../components/DepartmentCard";
import { CardSkeleton } from "../../components/Loader";
import { fetchDepartments } from "../../api/departmentApi";

export default function DepartmentsList() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetchDepartments({ limit: 50 }).then((d) => setItems(d.items)).catch(() => setItems([]));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-wheat/70">By academic unit</span>
        <h1 className="mt-2 font-display text-3xl text-parchment sm:text-4xl">Departments</h1>
        <p className="mt-3 max-w-xl text-parchment/55">See which academic unit produced which research.</p>
      </motion.div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items === null
          ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
          : items.map((d, i) => <DepartmentCard key={d._id} department={d} index={i} />)}
      </div>
    </div>
  );
}
