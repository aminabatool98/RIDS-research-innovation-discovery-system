import { Link } from "react-router-dom";
import { Sprout } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-ink-line bg-ink-soft/40">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-wheat" />
            <span className="font-display text-lg">RIDS</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-parchment/50">
            The Research Information Discovery System — a single catalogue of every paper, faculty
            profile and milestone this university has produced.
          </p>
        </div>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-parchment/40">Browse</div>
          <ul className="mt-3 space-y-2 text-sm text-parchment/70">
            <li><Link to="/research" className="hover:text-wheat">Research</Link></li>
            <li><Link to="/departments" className="hover:text-wheat">Departments</Link></li>
            <li><Link to="/fields" className="hover:text-wheat">Fields</Link></li>
            <li><Link to="/faculty" className="hover:text-wheat">Faculty</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-parchment/40">Stay current</div>
          <ul className="mt-3 space-y-2 text-sm text-parchment/70">
            <li><Link to="/media" className="hover:text-wheat">Media coverage</Link></li>
            <li><Link to="/events" className="hover:text-wheat">Events</Link></li>
            <li><Link to="/news" className="hover:text-wheat">News</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-parchment/40">Account</div>
          <ul className="mt-3 space-y-2 text-sm text-parchment/70">
            <li><Link to="/login" className="hover:text-wheat">Log in</Link></li>
            <li><Link to="/register" className="hover:text-wheat">Create an account</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-2 border-t border-ink-line pt-6 text-xs text-parchment/40 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Research Information Discovery System.</span>
        <span className="font-mono">Built on MongoDB · Express · React · Node</span>
      </div>
    </div>
  </footer>
);
