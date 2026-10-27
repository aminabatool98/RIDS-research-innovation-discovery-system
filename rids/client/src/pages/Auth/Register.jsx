import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Sprout } from "lucide-react";
import { register } from "../../api/authApi";
import { setCredentials } from "../../redux/slices/authSlice";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await register(form);
      dispatch(setCredentials(data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-14 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 flex items-center justify-center gap-2">
          <Sprout className="h-6 w-6 text-wheat" />
          <span className="font-display text-xl">RIDS</span>
        </div>
        <h1 className="text-center font-display text-2xl text-parchment">Create your account</h1>
        <p className="mt-2 text-center text-sm text-parchment/50">Bookmark research and keep your chat history across visits.</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {error && <p className="rounded-md border border-clay/40 bg-clay/10 px-4 py-2 text-sm text-clay">{error}</p>}
          <input
            required
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="focus-ring w-full rounded-md border border-ink-line bg-ink-soft px-4 py-3 text-sm text-parchment placeholder:text-parchment/40"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="focus-ring w-full rounded-md border border-ink-line bg-ink-soft px-4 py-3 text-sm text-parchment placeholder:text-parchment/40"
          />
          <input
            required
            type="password"
            minLength={6}
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="focus-ring w-full rounded-md border border-ink-line bg-ink-soft px-4 py-3 text-sm text-parchment placeholder:text-parchment/40"
          />
          <button
            type="submit"
            disabled={loading}
            className="focus-ring w-full rounded-full bg-wheat py-3 text-sm font-medium text-ink hover:bg-wheat-soft disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-parchment/50">
          Already have an account? <Link to="/login" className="text-wheat hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}
