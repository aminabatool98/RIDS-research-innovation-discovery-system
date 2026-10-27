import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "../components/HeroSection";
import { ResearchCard } from "../components/ResearchCard";
import { FieldCard } from "../components/FieldCard";
import { DepartmentCard } from "../components/DepartmentCard";
import { CardSkeleton } from "../components/Loader";
import { fetchResearch } from "../api/researchApi";
import { fetchFields } from "../api/fieldApi";
import { fetchDepartments } from "../api/departmentApi";
import { fetchFaculty } from "../api/facultyApi";

const SectionHeader = ({ eyebrow, title, to }) => (
  <div className="mb-8 flex items-end justify-between">
    <div>
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-wheat/70">{eyebrow}</span>
      <h2 className="mt-2 font-display text-2xl text-parchment sm:text-3xl">{title}</h2>
    </div>
    {to && (
      <Link to={to} className="focus-ring hidden items-center gap-1 text-sm text-parchment/60 hover:text-wheat sm:flex">
        View all <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    )}
  </div>
);

export default function Home() {
  const [featured, setFeatured] = useState(null);
  const [fields, setFields] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchResearch({ featured: true, limit: 6 }).then((d) => setFeatured(d.items)).catch(() => setFeatured([]));
    fetchFields().then((d) => setFields(d.items)).catch(() => setFields([]));
    fetchDepartments().then((d) => setDepartments(d.items)).catch(() => setDepartments([]));

    Promise.all([
      fetchResearch({ limit: 1 }),
      fetchDepartments({ limit: 1 }),
      fetchFields({ limit: 1 }),
      fetchFaculty({ limit: 1 }),
    ])
      .then(([r, d, f, fac]) => setStats({ papers: r.total, departments: d.total, fields: f.total, faculty: fac.total }))
      .catch(() => {});
  }, []);

  return (
    <div>
      <HeroSection stats={stats} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeader eyebrow="Catalogue" title="Featured research" to="/research" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured === null
            ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
            : featured.length === 0
            ? <p className="text-parchment/50 col-span-full">No featured research yet — check back soon.</p>
            : featured.map((p, i) => <ResearchCard key={p._id} paper={p} index={i} />)}
        </div>
      </section>

      <section className="border-y border-ink-line bg-ink-soft/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader eyebrow="Two-way discovery" title="Browse by field of knowledge" to="/fields" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {fields === null
              ? Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />)
              : fields.map((f, i) => <FieldCard key={f._id} field={f} index={i} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeader eyebrow="Or by unit" title="Browse by department" to="/departments" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments === null
            ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
            : departments.map((d, i) => <DepartmentCard key={d._id} department={d} index={i} />)}
        </div>
      </section>

      <section className="border-t border-ink-line bg-ink-soft/30 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl px-4 text-center sm:px-6"
        >
          <h2 className="font-display text-2xl text-parchment sm:text-3xl">Not sure where to start?</h2>
          <p className="mt-3 text-parchment/60">
            Ask the assistant in the corner — it searches the whole catalogue for you.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
