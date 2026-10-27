import Faculty from "../models/Faculty.js";

export const getFacultyList = async (req, res, next) => {
  try {
    const { department, search, page = 1, limit = 20 } = req.query;
    const query = {};
    if (department) query.department = department;
    if (search) query.name = { $regex: search, $options: "i" };

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Faculty.find(query).populate("department", "name slug").sort("name").skip(skip).limit(Number(limit)),
      Faculty.countDocuments(query),
    ]);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

export const getFacultyProfile = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.params.id)
      .populate("department", "name slug")
      .populate({ path: "researchPapers", populate: [{ path: "field", select: "name" }] });
    if (!faculty) return res.status(404).json({ message: "Faculty member not found" });
    res.json(faculty);
  } catch (err) {
    next(err);
  }
};

export const createFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.create(req.body);
    res.status(201).json(faculty);
  } catch (err) {
    next(err);
  }
};

export const updateFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!faculty) return res.status(404).json({ message: "Faculty member not found" });
    res.json(faculty);
  } catch (err) {
    next(err);
  }
};

export const deleteFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) return res.status(404).json({ message: "Faculty member not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
