import express from "express";
import Course from "../models/course.js";
import multer from "multer";

const router = express.Router();

// Multer memory storage to store files as buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create new course
router.post("/", upload.fields([{ name: "image" }, { name: "video" }]), async (req, res) => {
  try {
    const { title, instructor, description, date, skills, instructorId } = req.body;

    if (!title || !instructorId) {
      return res.status(400).json({ message: "Title and instructorId are required" });
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
});

// Get courses by instructorId
router.get("/instructor/:id", async (req, res) => {
  try {
    const courses = await Course.find({ instructorId: req.params.id });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// Get course by ID
router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Not found" });
  res.json(course);
});

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

export default router;
