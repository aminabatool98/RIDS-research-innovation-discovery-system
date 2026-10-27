import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck, Download, ArrowLeft } from "lucide-react";
import { Loader } from "../../components/Loader";
import { ResearchCard } from "../../components/ResearchCard";
import { formatDate } from "../../utils/formatDate";
import { fetchResearchOne, fetchRelatedResearch } from "../../api/researchApi";
import { addBookmark, removeBookmark, fetchBookmarks } from "../../api/bookmarkApi";
import { useAuth } from "../../hooks/useAuth";

export default function ResearchDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [paper, setPaper] = useState(null);
  const [related, setRelated] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setPaper(null);
    fetchResearchOne(id).then(setPaper).catch(() => setPaper(false));
    fetchRelatedResearch(id).then(setRelated).catch(() => setRelated([]));
    if (isAuthenticated) {
      fetchBookmarks()
        .then((list) => setBookmarked(list.some((b) => b.researchPaperId?._id === id)))
        .catch(() => {});
    }
  }, [id, isAuthenticated]);

  const toggleBookmark = async () => {
    if (!isAuthenticated || busy) return;
    setBusy(true);
    try {
      if (bookmarked) {
        await removeBookmark(id);
        setBookmarked(false);
      } else {
        await addBookmark(id);
        setBookmarked(true);
      }
    } finally {
      setBusy(false);
    }
  };

  if (paper === null) return <Loader label="Loading paper" />;
  if (paper === false) {
    return <div className="mx-auto max-w-3xl px-4 py-24 text-center text-parchment/60">Research paper not found.</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Link to="/research" className="focus-ring inline-flex items-center gap-1 text-sm text-parchment/50 hover:text-wheat">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to research
      </Link>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {paper.department?.name && (
            <span className="rounded-full border border-ink-line px-2.5 py-1 text-parchment/60">{paper.department.name}</span>
          )}
          {paper.field?.name && (
            <span className="rounded-full border border-moss/40 bg-moss/10 px-2.5 py-1 text-moss">{paper.field.name}</span>
          )}
          {paper.isFeatured && (
            <span className="rounded-full bg-wheat/15 px-2.5 py-1 font-medium text-wheat">Featured</span>
          )}
        </div>

        <h1 className="mt-4 font-display text-3xl leading-tight text-parchment sm:text-4xl">{paper.title}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-parchment/50">
          <span>{paper.authors?.join(", ")}</span>
          <span>·</span>
          <span>{paper.publishedYear}</span>
          <span>·</span>
          <span>{paper.views} views</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {paper.fileUrl && (
            <a
              href={paper.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center gap-2 rounded-full bg-wheat px-5 py-2.5 text-sm font-medium text-ink hover:bg-wheat-soft"
            >
              <Download className="h-4 w-4" /> Download paper
            </a>
          )}
          <button
            onClick={toggleBookmark}
            disabled={!isAuthenticated || busy}
            title={!isAuthenticated ? "Log in to bookmark" : ""}
            className="focus-ring flex items-center gap-2 rounded-full border border-ink-line px-5 py-2.5 text-sm text-parchment/80 hover:border-wheat/40 disabled:opacity-40"
          >
            {bookmarked ? <BookmarkCheck className="h-4 w-4 text-wheat" /> : <Bookmark className="h-4 w-4" />}
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </button>
        </div>

        <div className="mt-10 border-t border-ink-line pt-8">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-wheat/70">Abstract</h2>
          <p className="mt-3 leading-relaxed text-parchment/80">{paper.abstract}</p>
        </div>

        {paper.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {paper.tags.map((t) => (
              <span key={t} className="rounded-full bg-ink-line px-3 py-1 text-xs text-parchment/60">#{t}</span>
            ))}
          </div>
        )}
      </motion.div>

      {related.length > 0 && (
        <div className="mt-16 border-t border-ink-line pt-10">
          <h2 className="font-display text-xl text-parchment">You may also be interested in</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {related.map((p, i) => (
              <ResearchCard key={p._id} paper={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
