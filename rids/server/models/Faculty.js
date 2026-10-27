import mongoose from "mongoose";
import slugify from "slugify";

const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    designation: { type: String, default: "" },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    bio: { type: String, default: "" },
    photoUrl: { type: String, default: "" },
    email: { type: String, default: "" },
    researchPapers: [{ type: mongoose.Schema.Types.ObjectId, ref: "ResearchPaper" }],
  },
  { timestamps: true }
);

facultySchema.pre("validate", function (next) {
  if (this.name) this.slug = slugify(this.name + "-" + Date.now().toString().slice(-5), { lower: true, strict: true });
  next();
});

export default mongoose.model("Faculty", facultySchema);
