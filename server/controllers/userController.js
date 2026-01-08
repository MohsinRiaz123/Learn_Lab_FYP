// controllers/userController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password").lean();

    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure defaults for frontend
    user.profilePicture = user.profilePicture || "";
    user.socialLinks = user.socialLinks || {
      twitter: "",
      linkedin: "",
      github: "",
    };

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const {
      firstName,
      lastName,
      phone,
      occupation,
      bio,
      twitter,
      linkedin,
      github,
      currentPassword,
      newPassword,
    } = req.body;

    // Update personal info
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (occupation) user.occupation = occupation;
    if (bio) user.bio = bio;

    // Update social links
    user.socialLinks = {
      twitter: twitter || user.socialLinks?.twitter || "",
      linkedin: linkedin || user.socialLinks?.linkedin || "",
      github: github || user.socialLinks?.github || "",
    };

    // Handle password update
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Current password incorrect" });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // Handle profile picture upload
    if (req.files && req.files.profilePicture) {
      const file = req.files.profilePicture[0];
      const uploadPath = `uploads/profiles/${file.filename}`;

      // Delete old image if exists
      if (
        user.profilePicture &&
        fs.existsSync(`uploads/profiles/${user.profilePicture}`)
      ) {
        fs.unlinkSync(`uploads/profiles/${user.profilePicture}`);
      }

      user.profilePicture = file.filename;
    }

    await user.save();

    const updatedUser = await User.findById(req.params.id)
      .select("-password")
      .lean();
    updatedUser.profilePicture = updatedUser.profilePicture || "";
    updatedUser.socialLinks = updatedUser.socialLinks || {
      twitter: "",
      linkedin: "",
      github: "",
    };

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL STUDENTS
export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("firstName lastName email status createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

// UPDATE STUDENT STATUS
export const updateStudentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const student = await User.findOneAndUpdate(
      { _id: req.params.id, role: "student" },
      { status },
      { new: true }
    ).select("firstName lastName email status");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Status update failed" });
  }
};

// Get all instructors
export const getAllInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ role: "instructor" })
      .select("firstName lastName email status createdAt resume") // make sure 'resume' field exists
      .sort({ createdAt: -1 });

    res.status(200).json(instructors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch instructors" });
  }
};

// Update instructor status
export const updateInstructorStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const instructor = await User.findOneAndUpdate(
      { _id: req.params.id, role: "instructor" },
      { status },
      { new: true }
    ).select("firstName lastName email status createdAt resume");

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json(instructor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Status update failed" });
  }
};

export const downloadInstructorResume = async (req, res) => {
  try {
    const instructor = await User.findById(req.params.id);
    if (!instructor || !instructor.resume)
      return res.status(404).json({ message: "Resume not found" });

    const buffer = Buffer.from(instructor.resume.data, "base64");
    res.set({
      "Content-Type": instructor.resume.contentType,
      "Content-Disposition": `attachment; filename="${instructor.resume.filename}"`,
    });

    res.send(buffer);
  } catch (error) {
    console.error("Error downloading resume:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all industry experts
export const getAllExperts = async (req, res) => {
  try {
    const experts = await User.find({ role: "industryExpert" })
      .select("firstName lastName email occupation status createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json(experts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// ADD new expert
export const addExpert = async (req, res) => {
  try {
    const { firstName, lastName, email, occupation, password } = req.body;

    if (!firstName || !lastName || !email || !occupation || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const expert = await User.create({
      firstName,
      lastName,
      email,
      occupation,          // ✅ expertise stored here
      password: hashedPassword,
      role: "industryExpert",
      status: "inactive",
    });

    res.status(201).json(expert);
  } catch (error) {
    console.error("Error adding expert:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Update expert status
export const updateExpertStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const expert = await User.findById(id);
    if (!expert || expert.role !== "industryExpert") {
      return res.status(404).json({ message: "Expert not found" });
    }

    expert.status = status;
    await expert.save();

    res.status(200).json(expert);
  } catch (error) {
    console.error("Error updating expert status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
