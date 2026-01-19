import Course from "../models/Course.js";
import mongoose from "mongoose";

/** Helper to validate ObjectId */
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/** Create a course (protected - instructor) */
export const createCourse = async (req, res) => {
  try {
    const { title, slug, description, modules, capacity, price, tags, published } = req.body;
    if (!title || !slug) return res.status(400).json({ message: "title and slug are required" });

    // ensure slug uniqueness
    const exists = await Course.findOne({ slug });
    if (exists) return res.status(409).json({ message: "Slug already in use" });

    const course = await Course.create({
      title,
      slug,
      description,
      modules: modules || [],
      capacity: capacity || 0,
      price: price || 0,
      tags: tags || [],
      published: !!published,
      instructor: req.userId
    });

    return res.status(201).json(course);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

/** Get all courses (public) - simple pagination + filters */
export const getAllCourses = async (req, res) => {
  try {
    const { page = 1, limit = 20, q, tag } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const filter = {};
    if (q) filter.$or = [
      { title: new RegExp(q, "i") },
      { description: new RegExp(q, "i") }
    ];
    if (tag) filter.tags = tag;

    const [courses, total] = await Promise.all([
      Course.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate("instructor", "name email"),
      Course.countDocuments(filter)
    ]);

    return res.json({ courses, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

/** Get course by id (public) */
export const getCourseById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid course id" });

    const course = await Course.findById(id)
      .populate("instructor", "name email")
      .populate("students", "name email");

    if (!course) return res.status(404).json({ message: "Course not found" });
    return res.json(course);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

/** Update course (protected, only instructor or admin) */
export const updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid course id" });

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Only instructor (course creator) can update
    if (course.instructor.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to update this course" });
    }

    const updates = req.body;
    Object.assign(course, updates);
    await course.save();
    return res.json(course);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

/** Delete course (protected, only instructor) */
export const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid course id" });

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.instructor.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this course" });
    }

    await Course.deleteOne({ _id: id });
    return res.json({ message: "Course deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

/** Enroll current user into course (protected) */
export const enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.userId;

    if (!isValidObjectId(courseId)) return res.status(400).json({ message: "Invalid course id" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // capacity check
    if (course.capacity > 0 && course.students.length >= course.capacity) {
      return res.status(400).json({ message: "Course capacity reached" });
    }

    // already enrolled?
    if (course.students.some(s => s.toString() === userId)) {
      return res.status(409).json({ message: "Already enrolled" });
    }

    course.students.push(userId);
    await course.save();

    return res.json({ message: "Enrolled successfully", courseId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
