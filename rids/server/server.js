import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import fieldRoutes from "./routes/fieldRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import researchRoutes from "./routes/researchRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();
connectDB();
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { message: "Too many attempts, please try again later." },
});
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

app.get("/api/health", (req, res) => res.json({ status: "ok", time: new Date().toISOString() }));

app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/fields", fieldRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`RIDS server running on port ${PORT}`));
