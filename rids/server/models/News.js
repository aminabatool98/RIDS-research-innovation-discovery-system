import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    publishedDate: { type: Date, default: Date.now },
    tags: [{ type: String }],
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

newsSchema.index({ title: "text", content: "text" });

export default mongoose.model("News", newsSchema);
