import express from "express";
import { auth as protect } from "../middleware/authMiddleware.js";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollCourse
} from "../controllers/courseController.js";

const router = express.Router();

// Create new course (protected)
router.post("/", protect, createCourse);

// Get all courses (public)
router.get("/", getAllCourses);

// Get single course (public)
router.get("/:id", getCourseById);

// Update a course (protected; only instructor)
router.put("/:id", protect, updateCourse);

// Delete a course (protected; only instructor)
router.delete("/:id", protect, deleteCourse);

// Enroll into a course (protected)
router.post("/:id/enroll", protect, enrollCourse);

export default router;
