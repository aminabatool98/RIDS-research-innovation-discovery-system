import express from "express";
import { getMedia, getMediaItem, createMedia, updateMedia, deleteMedia } from "../controllers/mediaController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getMedia);
router.get("/:id", getMediaItem);
router.post("/", protect, adminOnly, createMedia);
router.put("/:id", protect, adminOnly, updateMedia);
router.delete("/:id", protect, adminOnly, deleteMedia);

export default router;
