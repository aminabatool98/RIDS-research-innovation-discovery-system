import User from "../models/User.js";

export const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search = "" } = req.query;
    const query = search
      ? { $or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }] }
      : {};
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      User.find(query).select("-password").sort("-createdAt").skip(skip).limit(Number(limit)),
      User.countDocuments(query),
    ]);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true, runValidators: true }
    ).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const toggleUserActive = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.isActive = !user.isActive;
    await user.save();
    res.json({ _id: user._id, isActive: user.isActive });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
