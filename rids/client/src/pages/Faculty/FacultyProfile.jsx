import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "../../components/Loader";
import { ResearchCard } from "../../components/ResearchCard";
import { fetchFacultyOne } from "../../api/facultyApi";

export default function FacultyProfile() {
  const { id } = useParams();
  const [faculty, setFaculty] = useState(null);

  useEffect(() => {
    fetchFacultyOne(id).then(setFaculty).catch(() => setFaculty(false));
  }, [id]);

  if (faculty === null) return <Loader label="Loading profile" />;
  if (faculty === false) return <div className="py-24 text-center text-parchment/60">Faculty member not found.</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-moss/20 font-display text-3xl text-moss">
          {faculty.name?.charAt(0)}
        </div>
        <h1 className="font-display text-3xl text-parchment">{faculty.name}</h1>
        <p className="mt-1 text-parchment/50">{faculty.designation}</p>
        <p className="mt-1 text-wheat/80 text-sm">{faculty.department?.name}</p>
        {faculty.bio && <p className="mt-5 max-w-xl text-parchment/65">{faculty.bio}</p>}
      </motion.div>

      {faculty.researchPapers?.length > 0 && (
        <div className="mt-14 border-t border-ink-line pt-10">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-wheat/70">Published research</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {faculty.researchPapers.map((p, i) => <ResearchCard key={p._id} paper={p} index={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}
