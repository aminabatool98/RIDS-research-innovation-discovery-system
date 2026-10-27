import Bookmark from "../models/Bookmark.js";

export const getMyBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user._id }).populate({
      path: "researchPaperId",
      populate: [{ path: "department", select: "name" }, { path: "field", select: "name color" }],
    });
    res.json(bookmarks);
  } catch (err) {
    next(err);
  }
};

export const addBookmark = async (req, res, next) => {
  try {
    const { researchPaperId } = req.body;
    const existing = await Bookmark.findOne({ userId: req.user._id, researchPaperId });
    if (existing) return res.status(400).json({ message: "Already bookmarked" });

    const bookmark = await Bookmark.create({ userId: req.user._id, researchPaperId });
    res.status(201).json(bookmark);
  } catch (err) {
    next(err);
  }
};

export const removeBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      userId: req.user._id,
      researchPaperId: req.params.researchPaperId,
    });
    if (!bookmark) return res.status(404).json({ message: "Bookmark not found" });
    res.json({ message: "Removed from bookmarks" });
  } catch (err) {
    next(err);
  }
};
