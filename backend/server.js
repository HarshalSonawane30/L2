import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

// Resolve backend directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, ".env");


// Load .env
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log("Loaded .env successfully");
} else {
  console.log("⚠️ .env not found at ->", envPath);
}

// Fallback if MONGO_URI missing
if (!process.env.MONGO_URI) {
  process.env.MONGO_URI = "mongodb://127.0.0.1:27017/learnletlearn";
  console.log("Applied fallback MONGO_URI");
}

// Fallback JWT secret for development
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "dev_secret_change_me";
  console.log("Applied fallback JWT_SECRET (development only)");
}

console.log("Using MONGO_URI =", process.env.MONGO_URI);

// Connect database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/users", userRoutes);
app.use("/api", communityRoutes);
app.use("/api/courses", courseRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
