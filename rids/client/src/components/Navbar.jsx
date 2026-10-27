import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, Sprout } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { useAuth } from "../hooks/useAuth";

const links = [
  { to: "/research", label: "Research" },
  { to: "/departments", label: "Departments" },
  { to: "/fields", label: "Fields" },
  { to: "/faculty", label: "Faculty" },
  { to: "/media", label: "Media" },
  { to: "/events", label: "Events" },
  { to: "/news", label: "News" },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Sprout className="h-5 w-5 text-wheat" />
          <span className="font-display text-lg font-medium tracking-tight">RIDS</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative px-3 py-2 text-sm transition-colors ${
                  isActive ? "text-wheat" : "text-parchment/70 hover:text-parchment"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-px h-px bg-wheat"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden flex-1 md:block lg:max-w-xs">
          <SearchBar compact />
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="rounded-full border border-wheat/40 px-3 py-1.5 text-xs font-medium text-wheat hover:bg-wheat/10"
                >
                  Admin
                </Link>
              )}
              <Link
                to="/dashboard"
                className="rounded-full px-3 py-1.5 text-xs font-medium text-parchment/80 hover:bg-ink-line"
              >
                {user?.name?.split(" ")[0] || "Dashboard"}
              </Link>
              <button
                onClick={logout}
                className="rounded-full bg-ink-line px-3 py-1.5 text-xs font-medium text-parchment/80 hover:bg-ink-soft"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-3 py-1.5 text-sm text-parchment/80 hover:text-parchment">
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-wheat px-4 py-1.5 text-sm font-medium text-ink hover:bg-wheat-soft"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        <button className="ml-auto text-parchment lg:hidden" onClick={() => setMenuOpen((v) => !v)}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink-line lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              <div className="mb-3">
                <SearchBar compact />
              </div>
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-parchment/80 hover:bg-ink-line"
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-ink-line pt-3">
                {isAuthenticated ? (
                  <>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-sm text-wheat">
                        Admin panel
                      </Link>
                    )}
                    <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-sm text-parchment/80">
                      Dashboard
                    </Link>
                    <button onClick={() => { logout(); setMenuOpen(false); }} className="text-left text-sm text-parchment/80">
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm text-parchment/80">
                      Log in
                    </Link>
                    <Link to="/register" onClick={() => setMenuOpen(false)} className="text-sm text-wheat">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
