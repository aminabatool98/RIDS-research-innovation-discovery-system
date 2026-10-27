import mongoose from "mongoose";
import slugify from "slugify";

const researchPaperSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    abstract: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    field: { type: mongoose.Schema.Types.ObjectId, ref: "Field", required: true },
    authors: [{ type: String }],
    tags: [{ type: String }],
    fileUrl: { type: String, default: "" },
    publishedYear: { type: Number, required: true },
    isFeatured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

researchPaperSchema.index({ title: "text", abstract: "text", tags: "text", authors: "text" });

researchPaperSchema.pre("validate", function (next) {
  if (this.title) this.slug = slugify(this.title + "-" + Date.now().toString().slice(-5), { lower: true, strict: true });
  next();
});

export default mongoose.model("ResearchPaper", researchPaperSchema);
