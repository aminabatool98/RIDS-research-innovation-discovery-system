import express from "express";
import { getUsers, updateUserRole, toggleUserActive, deleteUser } from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);
router.get("/", getUsers);
router.put("/:id/role", updateUserRole);
router.put("/:id/toggle-active", toggleUserActive);
router.delete("/:id", deleteUser);

export default router;
