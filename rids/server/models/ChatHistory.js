import mongoose from "mongoose";

const chatHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sessionId: { type: String, required: true },
    messages: [
      {
        sender: { type: String, enum: ["user", "bot"], required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("ChatHistory", chatHistorySchema);
