import express from "express";
import User from "../models/User.js";
import Course from "../models/Course.js";

const router = express.Router();

/**
 * GET /api/dashboard/stats
 */
router.get("/stats", async (req, res) => {
  try {
    const [totalStudents, activeCourses, instructors, industryExperts] =
      await Promise.all([
        User.countDocuments({ role: "student" }),
        Course.countDocuments({ status: "active" }),
        User.countDocuments({ role: "instructor" }),
        User.countDocuments({ role: "industryExpert" }),
      ]);

    res.json({
      totalStudents,
      activeCourses,
      instructors,
      industryExperts,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
});

export default router;
