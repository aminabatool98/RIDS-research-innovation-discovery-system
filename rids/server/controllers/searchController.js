import ResearchPaper from "../models/ResearchPaper.js";
import Faculty from "../models/Faculty.js";
import MediaCoverage from "../models/MediaCoverage.js";
import Event from "../models/Event.js";
import News from "../models/News.js";

// Global keyword search across every showcased content type.
export const globalSearch = async (req, res, next) => {
  try {
    const { q, department, field, year, type } = req.query;
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ message: "Search query must be at least 2 characters" });
    }

    const regex = { $regex: q, $options: "i" };
    const results = {};

    if (!type || type === "research") {
      const query = { $text: { $search: q } };
      if (department) query.department = department;
      if (field) query.field = field;
      if (year) query.publishedYear = Number(year);
      results.research = await ResearchPaper.find(query)
        .populate("department", "name")
        .populate("field", "name color")
        .limit(10);
    }
    if (!type || type === "faculty") {
      results.faculty = await Faculty.find({ name: regex }).populate("department", "name").limit(10);
    }
    if (!type || type === "media") {
      results.media = await MediaCoverage.find({ $text: { $search: q } }).limit(10);
    }
    if (!type || type === "events") {
      results.events = await Event.find({ $text: { $search: q } }).limit(10);
    }
    if (!type || type === "news") {
      results.news = await News.find({ $text: { $search: q } }).limit(10);
    }

    res.json(results);
  } catch (err) {
    next(err);
  }
};
