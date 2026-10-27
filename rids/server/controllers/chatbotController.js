import ChatHistory from "../models/ChatHistory.js";
import { getChatbotReply } from "../utils/aiService.js";

const newSessionId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);

export const sendMessage = async (req, res, next) => {
  try {
    const { message, sessionId } = req.body;
    if (!message || !message.trim()) return res.status(400).json({ message: "Message is required" });

    const sid = sessionId || newSessionId();
    const reply = await getChatbotReply(message);

    const filter = { sessionId: sid, ...(req.user ? { userId: req.user._id } : {}) };
    const history = await ChatHistory.findOneAndUpdate(
      filter,
      {
        $setOnInsert: { sessionId: sid, userId: req.user?._id },
        $push: {
          messages: {
            $each: [
              { sender: "user", text: message },
              { sender: "bot", text: reply.text },
            ],
          },
        },
      },
      { new: true, upsert: true }
    );

    res.json({ sessionId: sid, reply: reply.text, suggestions: reply.suggestions, history: history.messages });
  } catch (err) {
    next(err);
  }
};

export const getChatHistory = async (req, res, next) => {
  try {
    const history = await ChatHistory.find({ userId: req.user._id }).sort("-updatedAt").limit(20);
    res.json(history);
  } catch (err) {
    next(err);
  }
};
