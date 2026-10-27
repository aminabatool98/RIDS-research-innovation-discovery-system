import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Ban, CheckCircle2 } from "lucide-react";
import { fetchUsers, updateUserRole, toggleUserActive, deleteUser } from "../../api/userApi";

export default function ManageUsers() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const load = useCallback(() => {
    setData(null);
    fetchUsers({ search, page, limit: 15 }).then(setData);
  }, [search, page]);

  useEffect(() => {
    load();
  }, [load]);

  const handleRoleChange = async (id, role) => {
    await updateUserRole(id, role);
    load();
  };

  const handleToggleActive = async (id) => {
    await toggleUserActive(id);
    load();
  };

  const handleDelete = async (user) => {
    if (!confirm(`Delete user "${user.name}"? This can't be undone.`)) return;
    await deleteUser(user._id);
    load();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-parchment">Users</h1>
        <p className="mt-1 text-sm text-parchment/50">View registered users, manage roles, and disable accounts.</p>
      </div>

      <input
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        placeholder="Search by name or email…"
        className="focus-ring mb-4 w-full max-w-sm rounded-full border border-ink-line bg-ink-soft px-4 py-2 text-sm text-parchment placeholder:text-parchment/40"
      />

      <div className="overflow-x-auto rounded-lg border border-ink-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-soft text-parchment/50">
            <tr>
              <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wide">Name</th>
              <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wide">Email</th>
              <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wide">Role</th>
              <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wide">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-line">
            {data === null ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-parchment/40">Loading…</td></tr>
            ) : data.items.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-parchment/40">No users found.</td></tr>
            ) : (
              data.items.map((u) => (
                <tr key={u._id} className="hover:bg-ink-soft/50">
                  <td className="px-4 py-3 text-parchment/80">{u.name}</td>
                  <td className="px-4 py-3 text-parchment/60">{u.email}</td>
                  <td className="px-4 py-3">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="focus-ring rounded-md border border-ink-line bg-ink px-2 py-1 text-xs text-parchment"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${u.isActive ? "bg-moss/15 text-moss" : "bg-clay/15 text-clay"}`}>
                      {u.isActive ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <button
                      onClick={() => handleToggleActive(u._id)}
                      className="focus-ring mr-2 rounded p-1.5 text-parchment/50 hover:text-wheat"
                      title={u.isActive ? "Disable account" : "Enable account"}
                    >
                      {u.isActive ? <Ban className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                    </button>
                    <button onClick={() => handleDelete(u)} className="focus-ring rounded p-1.5 text-parchment/50 hover:text-clay">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {data && data.pages > 1 && (
        <div className="mt-4 flex justify-center gap-2 font-mono text-xs text-parchment/50">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="disabled:opacity-30">Prev</button>
          <span>Page {page} of {data.pages}</span>
          <button disabled={page >= data.pages} onClick={() => setPage((p) => p + 1)} className="disabled:opacity-30">Next</button>
        </div>
      )}
    </div>
  );
}
