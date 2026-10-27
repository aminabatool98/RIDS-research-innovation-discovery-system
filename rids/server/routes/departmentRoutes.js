import express from "express";
import {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getDepartments);
router.get("/:id", getDepartment);
router.post("/", protect, adminOnly, createDepartment);
router.put("/:id", protect, adminOnly, updateDepartment);
router.delete("/:id", protect, adminOnly, deleteDepartment);

export default router;
