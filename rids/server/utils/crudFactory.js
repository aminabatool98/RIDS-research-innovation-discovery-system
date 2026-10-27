// Generic CRUD controller factory used by the simpler content modules
// (Department, Field, MediaCoverage, Event, Achievement, News).
// Keeping this generic avoids duplicating the same create/read/update/delete
// logic six times while still giving each route file its own real endpoints.

export const getAll = (Model, defaultSort = "-createdAt") => async (req, res, next) => {
  try {
    const { page = 1, limit = 20, sort = defaultSort, ...filters } = req.query;
    const query = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== undefined && filters[key] !== "") query[key] = filters[key];
    });

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Model.find(query).sort(sort).skip(skip).limit(Number(limit)),
      Model.countDocuments(query),
    ]);

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

export const getOne = (Model) => async (req, res, next) => {
  try {
    const item = await Model.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const createOne = (Model) => async (req, res, next) => {
  try {
    const item = await Model.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const updateOne = (Model) => async (req, res, next) => {
  try {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const deleteOne = (Model) => async (req, res, next) => {
  try {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
