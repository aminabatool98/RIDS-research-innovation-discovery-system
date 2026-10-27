import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FacultyCard } from "../../components/FacultyCard";
import { CardSkeleton } from "../../components/Loader";
import { Pagination } from "../../components/Pagination";
import { fetchFaculty } from "../../api/facultyApi";
import { fetchDepartments } from "../../api/departmentApi";

export default function FacultyList() {
  const [data, setData] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchDepartments({ limit: 50 }).then((d) => setDepartments(d.items)).catch(() => {});
  }, []);

  useEffect(() => {
    setData(null);
    fetchFaculty({ department, search, page, limit: 12 }).then(setData).catch(() => setData({ items: [], pages: 0 }));
  }, [department, search, page]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-wheat/70">The people behind it</span>
        <h1 className="mt-2 font-display text-3xl text-parchment sm:text-4xl">Faculty</h1>
      </motion.div>

      <div className="mt-8 flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search by name…"
          className="focus-ring rounded-full border border-ink-line bg-ink-soft px-4 py-2 text-sm text-parchment placeholder:text-parchment/40"
        />
        <select
          value={department}
          onChange={(e) => { setDepartment(e.target.value); setPage(1); }}
          className="focus-ring rounded-full border border-ink-line bg-ink-soft px-4 py-2 text-sm text-parchment/80"
        >
          <option value="">All departments</option>
          {departments.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
        </select>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {data === null
          ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
          : data.items.length === 0
          ? <p className="col-span-full text-parchment/50">No faculty profiles match.</p>
          : data.items.map((f, i) => <FacultyCard key={f._id} faculty={f} index={i} />)}
      </div>
      {data && <Pagination page={data.page} pages={data.pages} onChange={setPage} />}
    </div>
  );
}
