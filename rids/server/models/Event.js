import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: Date, required: true },
    venue: { type: String, default: "" },
    relatedDepartment: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

eventSchema.index({ title: "text", description: "text" });

export default mongoose.model("Event", eventSchema);
