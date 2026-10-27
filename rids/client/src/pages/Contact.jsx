import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-xl px-4 py-20 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl text-parchment sm:text-4xl">Contact</h1>
        <p className="mt-3 text-parchment/55">Questions about a paper or the platform itself? Reach out below.</p>
      </motion.div>
      {sent ? (
        <p className="mt-8 rounded-lg border border-moss/40 bg-moss/10 px-4 py-3 text-moss">
          Message sent — thanks for reaching out.
        </p>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="mt-8 space-y-4"
        >
          <input required placeholder="Your name" className="focus-ring w-full rounded-md border border-ink-line bg-ink-soft px-4 py-3 text-sm text-parchment placeholder:text-parchment/40" />
          <input required type="email" placeholder="Your email" className="focus-ring w-full rounded-md border border-ink-line bg-ink-soft px-4 py-3 text-sm text-parchment placeholder:text-parchment/40" />
          <textarea required rows={5} placeholder="Message" className="focus-ring w-full rounded-md border border-ink-line bg-ink-soft px-4 py-3 text-sm text-parchment placeholder:text-parchment/40" />
          <button type="submit" className="focus-ring rounded-full bg-wheat px-6 py-2.5 text-sm font-medium text-ink hover:bg-wheat-soft">
            Send message
          </button>
        </form>
      )}
    </div>
  );
}
