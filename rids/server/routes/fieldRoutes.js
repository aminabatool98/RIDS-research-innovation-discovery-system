import express from "express";
import { getFields, getField, createField, updateField, deleteField } from "../controllers/fieldController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getFields);
router.get("/:id", getField);
router.post("/", protect, adminOnly, createField);
router.put("/:id", protect, adminOnly, updateField);
router.delete("/:id", protect, adminOnly, deleteField);

export default router;
