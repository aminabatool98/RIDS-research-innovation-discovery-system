import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MediaCard } from "../../components/MediaCard";
import { CardSkeleton } from "../../components/Loader";
import { Pagination } from "../../components/Pagination";
import { fetchMedia } from "../../api/mediaApi";

export default function MediaList() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setData(null);
    fetchMedia({ page, limit: 9 }).then(setData).catch(() => setData({ items: [], pages: 0 }));
  }, [page]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-wheat/70">In the press</span>
        <h1 className="mt-2 font-display text-3xl text-parchment sm:text-4xl">Media coverage</h1>
      </motion.div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data === null
          ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
          : data.items.length === 0
          ? <p className="col-span-full text-parchment/50">No media coverage posted yet.</p>
          : data.items.map((m, i) => <MediaCard key={m._id} item={m} index={i} />)}
      </div>
      {data && <Pagination page={data.page} pages={data.pages} onChange={setPage} />}
    </div>
  );
}
