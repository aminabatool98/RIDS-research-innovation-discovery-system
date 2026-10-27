import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X } from "lucide-react";

// A single generic CRUD screen used for every "simple" admin module
// (Departments, Fields, Media, Events, Achievements, News). Each caller just
// passes its own field schema and API functions — this component renders the
// table, the create/edit modal form, and wires up delete confirmation, so the
// same interaction pattern (and the same amount of code) doesn't get repeated
// six times across the admin panel.
//
// fieldSchema entries: { name, label, type: 'text'|'textarea'|'number'|'date'|'select'|'checkbox', options?: [{value,label}], required? }

export const AdminCrudTable = ({ title, description, columns, fieldSchema, api, pageSize = 10 }) => {
  const [items, setItems] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setItems(null);
    api.list({ page, limit: pageSize }).then((d) => {
      setItems(d.items || d);
      setTotal(d.total ?? (d.items || d).length);
    });
  }, [api, page, pageSize]);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    const defaults = {};
    fieldSchema.forEach((f) => { defaults[f.name] = f.type === "checkbox" ? false : ""; });
    setForm(defaults);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    const values = {};
    fieldSchema.forEach((f) => {
      let v = item[f.name];
      if (f.type === "date" && v) v = new Date(v).toISOString().slice(0, 10);
      if (f.ref && v && typeof v === "object") v = v._id;
      if (f.multi && Array.isArray(v)) v = v.join(", ");
      values[f.name] = v ?? (f.type === "checkbox" ? false : "");
    });
    setForm(values);
    setError("");
    setModalOpen(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...form };
      fieldSchema.forEach((f) => {
        if (f.multi && typeof payload[f.name] === "string") {
          payload[f.name] = payload[f.name].split(",").map((s) => s.trim()).filter(Boolean);
        }
        if (f.type === "number" && payload[f.name] !== "") payload[f.name] = Number(payload[f.name]);
      });
      if (editing) await api.update(editing._id, payload);
      else await api.create(payload);
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Check the fields and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!confirm(`Delete "${item[columns[0].key] || "this item"}"? This can't be undone.`)) return;
    await api.remove(item._id);
    load();
  };

  const pages = Math.ceil(total / pageSize) || 1;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-parchment">{title}</h1>
          {description && <p className="mt-1 text-sm text-parchment/50">{description}</p>}
        </div>
        <button
          onClick={openCreate}
          className="focus-ring flex items-center gap-1.5 rounded-full bg-wheat px-4 py-2 text-sm font-medium text-ink hover:bg-wheat-soft"
        >
          <Plus className="h-4 w-4" /> Add new
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-ink-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-soft text-parchment/50">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="px-4 py-3 font-mono text-[11px] uppercase tracking-wide">{c.label}</th>
              ))}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-line">
            {items === null ? (
              <tr><td colSpan={columns.length + 1} className="px-4 py-8 text-center text-parchment/40">Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={columns.length + 1} className="px-4 py-8 text-center text-parchment/40">Nothing here yet — add your first entry.</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="hover:bg-ink-soft/50">
                  {columns.map((c) => (
                    <td key={c.key} className="max-w-xs truncate px-4 py-3 text-parchment/80">
                      {c.render ? c.render(item) : String(item[c.key] ?? "—")}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <button onClick={() => openEdit(item)} className="focus-ring mr-2 rounded p-1.5 text-parchment/50 hover:text-wheat">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(item)} className="focus-ring rounded p-1.5 text-parchment/50 hover:text-clay">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="mt-4 flex justify-center gap-2 font-mono text-xs text-parchment/50">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="disabled:opacity-30">Prev</button>
          <span>Page {page} of {pages}</span>
          <button disabled={page >= pages} onClick={() => setPage((p) => p + 1)} className="disabled:opacity-30">Next</button>
        </div>
      )}

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border border-ink-line bg-ink-soft p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg text-parchment">{editing ? "Edit" : "Add"} {title.replace(/s$/, "")}</h2>
                <button onClick={() => setModalOpen(false)} className="focus-ring text-parchment/50 hover:text-parchment">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={submit} className="space-y-4">
                {error && <p className="rounded-md border border-clay/40 bg-clay/10 px-3 py-2 text-sm text-clay">{error}</p>}
                {fieldSchema.map((f) => (
                  <div key={f.name}>
                    <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-parchment/50">
                      {f.label}{f.required && " *"}
                    </label>
                    {f.type === "textarea" ? (
                      <textarea
                        required={f.required}
                        rows={3}
                        value={form[f.name] ?? ""}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        className="focus-ring w-full rounded-md border border-ink-line bg-ink px-3 py-2 text-sm text-parchment"
                      />
                    ) : f.type === "select" ? (
                      <select
                        required={f.required}
                        value={form[f.name] ?? ""}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        className="focus-ring w-full rounded-md border border-ink-line bg-ink px-3 py-2 text-sm text-parchment"
                      >
                        <option value="">Select…</option>
                        {f.options?.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    ) : f.type === "checkbox" ? (
                      <input
                        type="checkbox"
                        checked={!!form[f.name]}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.checked })}
                        className="h-4 w-4 accent-wheat"
                      />
                    ) : (
                      <input
                        required={f.required}
                        type={f.type || "text"}
                        value={form[f.name] ?? ""}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        className="focus-ring w-full rounded-md border border-ink-line bg-ink px-3 py-2 text-sm text-parchment"
                      />
                    )}
                    {f.hint && <p className="mt-1 text-xs text-parchment/40">{f.hint}</p>}
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={saving}
                  className="focus-ring w-full rounded-full bg-wheat py-2.5 text-sm font-medium text-ink hover:bg-wheat-soft disabled:opacity-60"
                >
                  {saving ? "Saving…" : editing ? "Save changes" : "Create"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
