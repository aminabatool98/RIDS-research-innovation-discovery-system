import mongoose from "mongoose";
import slugify from "slugify";

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

departmentSchema.pre("validate", function (next) {
  if (this.name) this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

export default mongoose.model("Department", departmentSchema);
