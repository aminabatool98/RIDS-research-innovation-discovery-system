import mongoose from "mongoose";
import slugify from "slugify";

const fieldSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, default: "" },
    color: { type: String, default: "#2F6F4F" },
  },
  { timestamps: true }
);

fieldSchema.pre("validate", function (next) {
  if (this.name) this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

export default mongoose.model("Field", fieldSchema);
