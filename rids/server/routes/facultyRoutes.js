import express from "express";
import {
  getFacultyList,
  getFacultyProfile,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from "../controllers/facultyController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getFacultyList);
router.get("/:id", getFacultyProfile);
router.post("/", protect, adminOnly, createFaculty);
router.put("/:id", protect, adminOnly, updateFaculty);
router.delete("/:id", protect, adminOnly, deleteFaculty);

export default router;
