import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Calendar,
  Award,
  Building2,
  Tag,
  Users2,
  Rss,
  Users,
} from "lucide-react";

const links = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/research", label: "Research", icon: FileText },
  { to: "/admin/departments", label: "Departments", icon: Building2 },
  { to: "/admin/fields", label: "Fields", icon: Tag },
  { to: "/admin/faculty", label: "Faculty", icon: Users2 },
  { to: "/admin/media", label: "Media", icon: Newspaper },
  { to: "/admin/events", label: "Events", icon: Calendar },
  { to: "/admin/achievements", label: "Achievements", icon: Award },
  { to: "/admin/news", label: "News", icon: Rss },
  { to: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout() {
  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-10 sm:px-6">
      <aside className="hidden w-56 shrink-0 md:block">
        <div className="sticky top-24 space-y-1">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-wheat/70">Admin panel</div>
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive ? "bg-wheat/15 text-wheat" : "text-parchment/60 hover:bg-ink-line hover:text-parchment"
                }`
              }
            >
              <Icon className="h-4 w-4" /> {label}
            </NavLink>
          ))}
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
