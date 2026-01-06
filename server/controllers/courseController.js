import Course from "../models/Course.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { title, instructor, instructorId, description, date, skills } = req.body;

    if (!instructorId) return res.status(400).json({ message: "Instructor ID is required" });

    const course = new Course({
      title,
      instructor,
      instructorId,
      description,
      date,
      skills: JSON.parse(skills),
      status: "pending",
    });

    // Save image
    if (req.files.image) {
      const file = req.files.image[0];
      course.image = file.buffer;
      course.imageType = file.mimetype;
    }

    // Save video
    if (req.files.video) {
      const file = req.files.video[0];
      course.video = file.buffer;
      course.videoType = file.mimetype;
    }

    await course.save();
    res.status(201).json({ message: "Course created successfully", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get all courses of a specific instructor
export const getInstructorCourses = async (req, res) => {
  try {
    const { instructorId } = req.params;
    const courses = await Course.find({ instructorId });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
