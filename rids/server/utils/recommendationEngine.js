import ResearchPaper from "../models/ResearchPaper.js";

// A deliberately simple, explainable recommender rather than a black box:
// score candidates by how much they share with the source paper
// (same field, same department, overlapping tags), then take the top N.
export const getRelated = async (paperId, limit = 4) => {
  const source = await ResearchPaper.findById(paperId);
  if (!source) return [];

  const candidates = await ResearchPaper.find({
    _id: { $ne: source._id },
    $or: [{ field: source.field }, { department: source.department }, { tags: { $in: source.tags } }],
  })
    .populate("department", "name slug")
    .populate("field", "name slug color")
    .limit(50);

  const scored = candidates.map((c) => {
    let score = 0;
    if (String(c.field) === String(source.field)) score += 3;
    if (String(c.department) === String(source.department)) score += 2;
    const sharedTags = c.tags.filter((t) => source.tags.includes(t));
    score += sharedTags.length;
    return { paper: c, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.paper);
};
