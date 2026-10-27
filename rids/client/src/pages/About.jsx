import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl text-parchment sm:text-4xl">About RIDS</h1>
        <p className="mt-5 leading-relaxed text-parchment/65">
          The Research Information Discovery System centralizes the university's research output —
          organizing every paper by both the department that produced it and the broader field of
          knowledge it contributes to. Faculty profiles, media coverage, events, achievements and news
          sit alongside the catalogue, all searchable in one place and kept current through a dedicated
          admin panel.
        </p>
      </motion.div>
    </div>
  );
}
