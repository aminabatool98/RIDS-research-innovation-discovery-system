import ResearchPaper from "../models/ResearchPaper.js";

export const getResearchList = async (req, res, next) => {
  try {
    const { department, field, year, tag, keyword, featured, page = 1, limit = 12, sort = "-createdAt" } = req.query;
    const query = {};
    if (department) query.department = department;
    if (field) query.field = field;
    if (year) query.publishedYear = Number(year);
    if (tag) query.tags = tag;
    if (featured) query.isFeatured = featured === "true";
    if (keyword) query.$text = { $search: keyword };

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      ResearchPaper.find(query)
        .populate("department", "name slug")
        .populate("field", "name slug color")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),
      ResearchPaper.countDocuments(query),
    ]);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

export const getResearchDetail = async (req, res, next) => {
  try {
    const paper = await ResearchPaper.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate("department", "name slug")
      .populate("field", "name slug color");
    if (!paper) return res.status(404).json({ message: "Research paper not found" });
    res.json(paper);
  } catch (err) {
    next(err);
  }
};

export const createResearch = async (req, res, next) => {
  try {
    const paper = await ResearchPaper.create(req.body);
    res.status(201).json(paper);
  } catch (err) {
    next(err);
  }
};

export const updateResearch = async (req, res, next) => {
  try {
    const paper = await ResearchPaper.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!paper) return res.status(404).json({ message: "Research paper not found" });
    res.json(paper);
  } catch (err) {
    next(err);
  }
};

export const deleteResearch = async (req, res, next) => {
  try {
    const paper = await ResearchPaper.findByIdAndDelete(req.params.id);
    if (!paper) return res.status(404).json({ message: "Research paper not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// "You may also be interested in" — simple, explainable recommendation logic
// (see utils/recommendationEngine.js), kept here so the route stays a thin wrapper.
export const getRelatedResearch = async (req, res, next) => {
  try {
    const { getRelated } = await import("../utils/recommendationEngine.js");
    const related = await getRelated(req.params.id);
    res.json(related);
  } catch (err) {
    next(err);
  }
};
