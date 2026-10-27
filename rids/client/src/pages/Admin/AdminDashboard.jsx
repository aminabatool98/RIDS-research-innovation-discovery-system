import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Building2, Tag, Users2, Newspaper, Calendar, Award, Rss, Users } from "lucide-react";
import { fetchResearch } from "../../api/researchApi";
import { fetchDepartments } from "../../api/departmentApi";
import { fetchFields } from "../../api/fieldApi";
import { fetchFaculty } from "../../api/facultyApi";
import { fetchMedia } from "../../api/mediaApi";
import { fetchEvents } from "../../api/eventApi";
import { fetchAchievements } from "../../api/achievementApi";
import { fetchNews } from "../../api/newsApi";
import { fetchUsers } from "../../api/userApi";

const tiles = [
  { key: "research", label: "Research papers", icon: FileText, to: "/admin/research", fetcher: () => fetchResearch({ limit: 1 }) },
  { key: "departments", label: "Departments", icon: Building2, to: "/admin/departments", fetcher: () => fetchDepartments({ limit: 1 }) },
  { key: "fields", label: "Fields", icon: Tag, to: "/admin/fields", fetcher: () => fetchFields({ limit: 1 }) },
  { key: "faculty", label: "Faculty", icon: Users2, to: "/admin/faculty", fetcher: () => fetchFaculty({ limit: 1 }) },
  { key: "media", label: "Media items", icon: Newspaper, to: "/admin/media", fetcher: () => fetchMedia({ limit: 1 }) },
  { key: "events", label: "Events", icon: Calendar, to: "/admin/events", fetcher: () => fetchEvents({ limit: 1 }) },
  { key: "achievements", label: "Achievements", icon: Award, to: "/admin/achievements", fetcher: () => fetchAchievements({ limit: 1 }) },
  { key: "news", label: "News posts", icon: Rss, to: "/admin/news", fetcher: () => fetchNews({ limit: 1 }) },
  { key: "users", label: "Registered users", icon: Users, to: "/admin/users", fetcher: () => fetchUsers({ limit: 1 }) },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    tiles.forEach((t) => {
      t.fetcher()
        .then((d) => setCounts((c) => ({ ...c, [t.key]: d.total })))
        .catch(() => setCounts((c) => ({ ...c, [t.key]: "—" })));
    });
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl text-parchment">Overview</h1>
      <p className="mt-1 text-sm text-parchment/50">Everything on the public site is managed from here.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {tiles.map((t, i) => (
          <motion.div
            key={t.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              to={t.to}
              className="focus-ring group block rounded-lg border border-ink-line bg-ink-soft p-5 transition-colors hover:border-wheat/40"
            >
              <t.icon className="h-5 w-5 text-wheat/70" />
              <div className="field-index mt-3 font-mono text-2xl text-parchment">
                {counts[t.key] ?? <span className="text-parchment/30">···</span>}
              </div>
              <div className="mt-1 text-xs text-parchment/50 group-hover:text-parchment">{t.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
