import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookmarkX } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { fetchBookmarks, removeBookmark } from "../../api/bookmarkApi";
import { ResearchCard } from "../../components/ResearchCard";
import { CardSkeleton } from "../../components/Loader";

export default function UserDashboard() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState(null);

  const load = () => fetchBookmarks().then(setBookmarks).catch(() => setBookmarks([]));

  useEffect(() => {
    load();
  }, []);

  const handleRemove = async (researchPaperId) => {
    await removeBookmark(researchPaperId);
    setBookmarks((prev) => prev.filter((b) => b.researchPaperId?._id !== researchPaperId));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-wheat/70">Your account</span>
        <h1 className="mt-2 font-display text-3xl text-parchment sm:text-4xl">
          Welcome, {user?.name?.split(" ")[0]}
        </h1>
      </motion.div>

      <div className="mt-10">
        <h2 className="font-display text-xl text-parchment">Bookmarked research</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarks === null ? (
            Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
          ) : bookmarks.length === 0 ? (
            <p className="col-span-full text-parchment/50">
              You haven't bookmarked any research yet — browse the catalogue and save what's useful.
            </p>
          ) : (
            bookmarks.map((b, i) =>
              b.researchPaperId ? (
                <div key={b._id} className="relative">
                  <ResearchCard paper={b.researchPaperId} index={i} />
                  <button
                    onClick={() => handleRemove(b.researchPaperId._id)}
                    className="focus-ring absolute right-3 top-3 rounded-full bg-ink/80 p-1.5 text-parchment/60 hover:text-clay"
                    title="Remove bookmark"
                  >
                    <BookmarkX className="h-4 w-4" />
                  </button>
                </div>
              ) : null
            )
          )}
        </div>
      </div>
    </div>
  );
}
