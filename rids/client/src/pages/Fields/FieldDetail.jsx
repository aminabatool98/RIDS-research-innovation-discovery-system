import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "../../components/Loader";
import { ResearchCard } from "../../components/ResearchCard";
import { fetchFieldOne } from "../../api/fieldApi";
import { fetchResearch } from "../../api/researchApi";

export default function FieldDetail() {
  const { id } = useParams();
  const [field, setField] = useState(null);
  const [papers, setPapers] = useState(null);

  useEffect(() => {
    fetchFieldOne(id).then(setField).catch(() => setField(false));
    fetchResearch({ field: id, limit: 12 }).then((d) => setPapers(d.items)).catch(() => setPapers([]));
  }, [id]);

  if (field === null) return <Loader label="Loading field" />;
  if (field === false) return <div className="py-24 text-center text-parchment/60">Field not found.</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: field.color }} />
        <h1 className="font-display text-3xl text-parchment sm:text-4xl">{field.name}</h1>
      </motion.div>
      {field.description && <p className="mt-3 max-w-2xl text-parchment/60">{field.description}</p>}
      <div className="mt-10">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-wheat/70">Research in this field</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {papers === null
            ? null
            : papers.length === 0
            ? <p className="col-span-full text-parchment/50">No research tagged in this field yet.</p>
            : papers.map((p, i) => <ResearchCard key={p._id} paper={p} index={i} />)}
        </div>
      </div>
    </div>
  );
}
