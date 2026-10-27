import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "../../components/Loader";
import { ResearchCard } from "../../components/ResearchCard";
import { fetchDepartmentOne } from "../../api/departmentApi";
import { fetchResearch } from "../../api/researchApi";

export default function DepartmentDetail() {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [papers, setPapers] = useState(null);

  useEffect(() => {
    fetchDepartmentOne(id).then(setDepartment).catch(() => setDepartment(false));
    fetchResearch({ department: id, limit: 12 }).then((d) => setPapers(d.items)).catch(() => setPapers([]));
  }, [id]);

  if (department === null) return <Loader label="Loading department" />;
  if (department === false) return <div className="py-24 text-center text-parchment/60">Department not found.</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl text-parchment sm:text-4xl">{department.name}</h1>
        <p className="mt-3 max-w-2xl text-parchment/60">{department.description}</p>
      </motion.div>
      <div className="mt-10">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-wheat/70">Research from this department</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {papers === null
            ? null
            : papers.length === 0
            ? <p className="col-span-full text-parchment/50">No research published yet.</p>
            : papers.map((p, i) => <ResearchCard key={p._id} paper={p} index={i} />)}
        </div>
      </div>
    </div>
  );
}
