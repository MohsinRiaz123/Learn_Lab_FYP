import express from "express";
import Course from "../models/course.js";
import multer from "multer";
import mongoose from "mongoose";

const router = express.Router();

// Multer memory storage to store files as buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create new course
router.post(
  "/",
  upload.fields([{ name: "image" }, { name: "video" }]),
  async (req, res) => {
    try {
      const { title, instructor, description, date, skills, instructorId } =
        req.body;

      if (!title || !instructorId) {
        return res
          .status(400)
          .json({ message: "Title and instructorId are required" });
      }

      const newCourse = new Course({
        title,
        instructor,
        description,
        date,
        skills: skills ? JSON.parse(skills) : [],
        instructorId,
        status: "pending",
        image: req.files.image ? req.files.image[0].buffer : null,
        imageType: req.files.image ? req.files.image[0].mimetype : null,
        video: req.files.video ? req.files.video[0].buffer : null,
        videoType: req.files.video ? req.files.video[0].mimetype : null,
      });

      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get courses by instructorId
router.get("/instructor/:id", async (req, res) => {
  try {
    const courses = await Course.find({ instructorId: req.params.id })
      .select("_id title instructor image status createdAt")
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// Get course by ID
// router.get("/:id", async (req, res) => {
//   const course = await Course.findById(req.params.id);
//   if (!course) return res.status(404).json({ message: "Not found" });
//   res.json(course);
// });

// Serve image by course ID
router.get("/:id/image", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course || !course.image) return res.status(404).send("No image found");
    res.set("Content-Type", course.imageType);
    res.send(course.image);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Serve video by course ID
router.get("/:id/video", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course || !course.video) return res.status(404).send("No video found");
    res.set("Content-Type", course.videoType);
    res.send(course.video);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Update course
router.put("/:id", upload.any(), async (req, res) => {
  const course = await Course.findById(req.params.id);

  course.title = req.body.title;
  course.description = req.body.description;
  course.date = req.body.date;
  course.skills = req.body.skills;

  req.files?.forEach((file) => {
    if (file.mimetype.startsWith("image")) {
      course.image = file.buffer;
      course.imageType = file.mimetype;
    }
    if (file.mimetype.startsWith("video")) {
      course.video = file.buffer;
      course.videoType = file.mimetype;
    }
  });

  await course.save();
  res.json({ message: "Updated" });
});

/* ================================
   GET ALL ACTIVE COURSES
================================ */
router.get("/status/active", async (req, res) => {
  try {
    const courses = await Course.find({ status: "active" })
      .select("_id title instructor image imageType status createdAt")
      .sort({ createdAt: -1 });
    const formatted = courses.map((courses) => courses.toJSON());
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================================
   GET COURSE COUNTS (INSTRUCTOR)
================================ */
router.get("/stats/:instructorId", async (req, res) => {
  try {
    const { instructorId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(instructorId)) {
      return res.status(400).json({ message: "Invalid instructor ID" });
    }

    const active = await Course.countDocuments({
      instructorId,
      status: "active",
    });

    const pending = await Course.countDocuments({
      instructorId,
      status: "pending",
    });

    res.json({ active, pending });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================================
   GET COURSE BY ID (KEEP LAST)
================================ */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET ALL COURSES (Admin)
 * /api/courses
 */
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find()
      .select("_id title instructor status createdAt")
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
});

/**
 * UPDATE COURSE STATUS
 * /api/courses/:id/status
 */
// PATCH COURSE STATUS
router.patch("/:id/status", async (req, res) => {
  const { status } = req.body;

  if (!["pending", "active", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
});

export default router;
