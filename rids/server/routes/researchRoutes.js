import express from "express";
import {
  getResearchList,
  getResearchDetail,
  createResearch,
  updateResearch,
  deleteResearch,
  getRelatedResearch,
} from "../controllers/researchController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getResearchList);
router.get("/:id", getResearchDetail);
router.get("/:id/related", getRelatedResearch);
router.post("/", protect, adminOnly, createResearch);
router.put("/:id", protect, adminOnly, updateResearch);
router.delete("/:id", protect, adminOnly, deleteResearch);

export default router;
