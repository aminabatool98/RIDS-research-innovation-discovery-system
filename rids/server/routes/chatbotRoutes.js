import express from "express";
import { sendMessage, getChatHistory } from "../controllers/chatbotController.js";
import { protect, optionalAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/message", optionalAuth, sendMessage);
router.get("/history", protect, getChatHistory);

export default router;
