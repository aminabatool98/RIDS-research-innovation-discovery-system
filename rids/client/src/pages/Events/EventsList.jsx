import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EventCard } from "../../components/EventCard";
import { CardSkeleton } from "../../components/Loader";
import { Pagination } from "../../components/Pagination";
import { fetchEvents } from "../../api/eventApi";

export default function EventsList() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setData(null);
    fetchEvents({ page, limit: 10 }).then(setData).catch(() => setData({ items: [], pages: 0 }));
  }, [page]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-wheat/70">On campus</span>
        <h1 className="mt-2 font-display text-3xl text-parchment sm:text-4xl">Events</h1>
      </motion.div>
      <div className="mt-10 space-y-4">
        {data === null
          ? Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)
          : data.items.length === 0
          ? <p className="text-parchment/50">No events scheduled yet.</p>
          : data.items.map((e, i) => <EventCard key={e._id} event={e} index={i} />)}
      </div>
      {data && <Pagination page={data.page} pages={data.pages} onChange={setPage} />}
    </div>
  );
}
