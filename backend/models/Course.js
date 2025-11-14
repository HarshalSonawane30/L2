import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  durationMinutes: { type: Number, default: 0 }
}, { _id: false });

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, trim: true, unique: true },
  description: { type: String, default: "" },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  modules: { type: [moduleSchema], default: [] },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  capacity: { type: Number, default: 0 }, // 0 = unlimited
  price: { type: Number, default: 0 },
  tags: { type: [String], default: [] },
  published: { type: Boolean, default: false }
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);
export default Course;
