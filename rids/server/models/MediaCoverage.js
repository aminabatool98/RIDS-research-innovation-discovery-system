import mongoose from "mongoose";

const mediaCoverageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    source: { type: String, required: true },
    link: { type: String, required: true },
    summary: { type: String, default: "" },
    relatedResearch: { type: mongoose.Schema.Types.ObjectId, ref: "ResearchPaper" },
    relatedFaculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
    publishedDate: { type: Date, required: true },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

mediaCoverageSchema.index({ title: "text", summary: "text" });

export default mongoose.model("MediaCoverage", mediaCoverageSchema);
