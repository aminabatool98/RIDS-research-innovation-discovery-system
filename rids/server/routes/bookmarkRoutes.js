import express from "express";
import { getMyBookmarks, addBookmark, removeBookmark } from "../controllers/bookmarkController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", getMyBookmarks);
router.post("/", addBookmark);
router.delete("/:researchPaperId", removeBookmark);

export default router;
