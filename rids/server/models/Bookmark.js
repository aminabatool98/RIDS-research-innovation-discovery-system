import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    researchPaperId: { type: mongoose.Schema.Types.ObjectId, ref: "ResearchPaper", required: true },
  },
  { timestamps: true }
);

bookmarkSchema.index({ userId: 1, researchPaperId: 1 }, { unique: true });

export default mongoose.model("Bookmark", bookmarkSchema);
