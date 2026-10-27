import express from "express";
import {
  getAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievementController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAchievements);
router.get("/:id", getAchievement);
router.post("/", protect, adminOnly, createAchievement);
router.put("/:id", protect, adminOnly, updateAchievement);
router.delete("/:id", protect, adminOnly, deleteAchievement);

export default router;
