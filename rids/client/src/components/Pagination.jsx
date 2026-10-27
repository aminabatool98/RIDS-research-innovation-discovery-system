import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ page, pages, onChange }) => {
  if (!pages || pages <= 1) return null;
  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-ink-line text-parchment/70 hover:border-wheat/50 disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="font-mono text-xs text-parchment/50">
        Page {page} of {pages}
      </span>
      <button
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
        className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-ink-line text-parchment/70 hover:border-wheat/50 disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};
