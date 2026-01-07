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
    user.socialLinks = user.socialLinks || { twitter: "", linkedin: "", github: "" };

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
      if (!isMatch) return res.status(400).json({ message: "Current password incorrect" });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // Handle profile picture upload
    if (req.files && req.files.profilePicture) {
      const file = req.files.profilePicture[0];
      const uploadPath = `uploads/profiles/${file.filename}`;

      // Delete old image if exists
      if (user.profilePicture && fs.existsSync(`uploads/profiles/${user.profilePicture}`)) {
        fs.unlinkSync(`uploads/profiles/${user.profilePicture}`);
      }

      user.profilePicture = file.filename;
    }

    await user.save();

    const updatedUser = await User.findById(req.params.id).select("-password").lean();
    updatedUser.profilePicture = updatedUser.profilePicture || "";
    updatedUser.socialLinks = updatedUser.socialLinks || { twitter: "", linkedin: "", github: "" };

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
