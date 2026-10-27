import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    recipientType: { type: String, enum: ["faculty", "student", "department"], required: true },
    recipientName: { type: String, required: true },
    relatedDepartment: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

achievementSchema.index({ title: "text", description: "text" });

export default mongoose.model("Achievement", achievementSchema);
