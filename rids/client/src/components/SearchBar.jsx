import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";
import { globalSearch } from "../api/searchApi";

export const SearchBar = ({ compact = false }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(query, 350);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (!debounced || debounced.trim().length < 2) {
      setResults(null);
      return;
    }
    setLoading(true);
    globalSearch({ q: debounced })
      .then((data) => setResults(data))
      .catch(() => setResults(null))
      .finally(() => setLoading(false));
  }, [debounced]);

  const flatCount = results
    ? Object.values(results).reduce((sum, arr) => sum + (arr?.length || 0), 0)
    : 0;

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim().length < 2) return;
    navigate(`/research?keyword=${encodeURIComponent(query)}`);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${compact ? "w-full" : "w-full max-w-md"}`}>
      <form onSubmit={submitSearch} className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment/40" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          type="text"
          placeholder="Search research, faculty, events…"
          className="focus-ring w-full rounded-full border border-ink-line bg-ink-soft py-2.5 pl-9 pr-9 text-sm text-parchment placeholder:text-parchment/40 transition-colors focus:border-wheat/60"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults(null);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-parchment/40 hover:text-parchment"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      <AnimatePresence>
        {open && (query.trim().length >= 2) && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-96 overflow-y-auto rounded-lg border border-ink-line bg-ink-soft shadow-card"
          >
            {loading && <div className="p-4 text-xs text-parchment/50 font-mono">Searching…</div>}
            {!loading && results && flatCount === 0 && (
              <div className="p-4 text-sm text-parchment/60">No matches for "{query}".</div>
            )}
            {!loading &&
              results &&
              Object.entries(results).map(([key, items]) =>
                items && items.length ? (
                  <div key={key} className="border-b border-ink-line last:border-0">
                    <div className="px-4 pt-3 pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-wheat/70">
                      {key}
                    </div>
                    {items.slice(0, 4).map((item) => (
                      <button
                        key={item._id}
                        onClick={() => {
                          setOpen(false);
                          if (key === "research") navigate(`/research/${item._id}`);
                          else if (key === "faculty") navigate(`/faculty/${item._id}`);
                          else navigate(`/${key}`);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-parchment/90 hover:bg-ink-line"
                      >
                        {item.title || item.name}
                      </button>
                    ))}
                  </div>
                ) : null
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
