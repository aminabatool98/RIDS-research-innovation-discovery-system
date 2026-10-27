import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ResearchCard } from "../../components/ResearchCard";
import { CardSkeleton } from "../../components/Loader";
import { Pagination } from "../../components/Pagination";
import { fetchResearch } from "../../api/researchApi";
import { fetchDepartments } from "../../api/departmentApi";
import { fetchFields } from "../../api/fieldApi";

export default function ResearchList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [fields, setFields] = useState([]);

  const department = searchParams.get("department") || "";
  const field = searchParams.get("field") || "";
  const year = searchParams.get("year") || "";
  const keyword = searchParams.get("keyword") || "";
  const page = Number(searchParams.get("page") || 1);

  useEffect(() => {
    fetchDepartments({ limit: 50 }).then((d) => setDepartments(d.items)).catch(() => {});
    fetchFields({ limit: 50 }).then((d) => setFields(d.items)).catch(() => {});
  }, []);

  useEffect(() => {
    setData(null);
    fetchResearch({ department, field, year, keyword, page, limit: 9 })
      .then(setData)
      .catch(() => setData({ items: [], total: 0, pages: 0 }));
  }, [department, field, year, keyword, page]);

  const updateParam = useCallback(
    (key, value) => {
      const next = new URLSearchParams(searchParams);
      if (value) next.set(key, value);
      else next.delete(key);
      next.delete("page");
      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );

  const years = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-wheat/70">Catalogue</span>
        <h1 className="mt-2 font-display text-3xl text-parchment sm:text-4xl">Research papers</h1>
        {keyword && <p className="mt-2 text-parchment/50">Showing results for "{keyword}"</p>}
      </motion.div>

      <div className="mt-8 flex flex-wrap gap-3">
        <select
          value={department}
          onChange={(e) => updateParam("department", e.target.value)}
          className="focus-ring rounded-full border border-ink-line bg-ink-soft px-4 py-2 text-sm text-parchment/80"
        >
          <option value="">All departments</option>
          {departments.map((d) => (
            <option key={d._id} value={d._id}>{d.name}</option>
          ))}
        </select>
        <select
          value={field}
          onChange={(e) => updateParam("field", e.target.value)}
          className="focus-ring rounded-full border border-ink-line bg-ink-soft px-4 py-2 text-sm text-parchment/80"
        >
          <option value="">All fields</option>
          {fields.map((f) => (
            <option key={f._id} value={f._id}>{f.name}</option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => updateParam("year", e.target.value)}
          className="focus-ring rounded-full border border-ink-line bg-ink-soft px-4 py-2 text-sm text-parchment/80"
        >
          <option value="">All years</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        {(department || field || year || keyword) && (
          <button
            onClick={() => setSearchParams({})}
            className="rounded-full border border-clay/40 px-4 py-2 text-sm text-clay hover:bg-clay/10"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data === null
          ? Array.from({ length: 9 }).map((_, i) => <CardSkeleton key={i} />)
          : data.items.length === 0
          ? <p className="col-span-full py-10 text-center text-parchment/50">No research papers match these filters yet.</p>
          : data.items.map((p, i) => <ResearchCard key={p._id} paper={p} index={i} />)}
      </div>

      {data && <Pagination page={data.page} pages={data.pages} onChange={(p) => updateParam("page", p)} />}
    </div>
  );
}
