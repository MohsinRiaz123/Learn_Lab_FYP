// File: routes/userRoutes.js

import express from "express";
import User from "../models/User.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {
  getAllStudents,
  updateStudentStatus,
  getAllInstructors,
  updateInstructorStatus,
  downloadInstructorResume,
  getAllExperts,
  updateExpertStatus,
  addExpert,
} from "../controllers/userController.js";

const router = express.Router();

// ---------------- Multer storage ----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "uploads/profiles";
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    // filename: <userId>-<timestamp>.<ext>
    cb(
      null,
      `${req.params.id}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });



/* STUDENT MANAGEMENT (ADMIN) */
router.get("/students", getAllStudents);
router.patch("/students/:id/status", updateStudentStatus);

// Instructor management
router.get("/instructors", getAllInstructors);
router.patch("/instructors/:id/status", updateInstructorStatus);

// Resume download
router.get("/instructors/:id/resume", downloadInstructorResume);

// Fetch all industry experts
router.get("/experts", getAllExperts);

// add new expert
router.post("/experts", addExpert);
// Update status of a specific expert
router.patch("/experts/:id/status", updateExpertStatus);




// ---------------- GET user by ID ----------------
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid user ID" });

    const user = await User.findById(id).select("-password").lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure profilePicture and socialLinks defaults
    user.profilePicture = user.profilePicture || "";
    user.socialLinks = user.socialLinks || {
      twitter: "",
      linkedin: "",
      github: "",
    };

    res.json(user);
  } catch (err) {
    console.error("User fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------- UPDATE user ----------------
router.put(
  "/:id",
  upload.single("profilePicture"), // accept single file named profilePicture
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const {
        firstName,
        lastName,
        email,
        phone,
        occupation,
        bio,
        twitter,
        linkedin,
        github,
        currentPassword,
        newPassword,
      } = req.body;

      // ---------- Personal Info ----------
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (phone) user.phone = phone;
      if (occupation) user.occupation = occupation;
      if (bio) user.bio = bio;

      // ---------- Social Links ----------
      user.socialLinks = {
        twitter: twitter || user.socialLinks?.twitter || "",
        linkedin: linkedin || user.socialLinks?.linkedin || "",
        github: github || user.socialLinks?.github || "",
      };

      // ---------- Password Update ----------
      if (currentPassword && newPassword) {
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch)
          return res
            .status(400)
            .json({ message: "Current password is incorrect" });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
      }

      // ---------- Profile Picture ----------
      if (req.file) {
        // Delete old profile picture if exists
        if (user.profilePicture) {
          const oldPath = path.join("uploads/profiles", user.profilePicture);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        user.profilePicture = req.file.filename;
      }

      await user.save();

      // Return updated user
      const updatedUser = await User.findById(req.params.id)
        .select("-password")
        .lean();
      updatedUser.profilePicture = updatedUser.profilePicture || "";
      updatedUser.socialLinks = updatedUser.socialLinks || {
        twitter: "",
        linkedin: "",
        github: "",
      };

      res.json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
      console.error("User update error:", err);
      res.status(500).json({ message: err.message });
    }
  }
);




export default router;
