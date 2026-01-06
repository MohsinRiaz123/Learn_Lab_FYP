import User from "../models/User.js";
import bcrypt from "bcryptjs";
import fs from "fs";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
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

    // Update basic fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (occupation) user.occupation = occupation;
    if (bio) user.bio = bio;

    // Social links
    user.socialLinks = {
      twitter: twitter || user.socialLinks?.twitter,
      linkedin: linkedin || user.socialLinks?.linkedin,
      github: github || user.socialLinks?.github,
    };

    // Handle password change
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: "Current password incorrect" });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // Handle profile image upload
    if (req.file) {
      // Delete old image if exists
      if (user.profileImage && fs.existsSync(user.profileImage)) {
        fs.unlinkSync(user.profileImage);
      }
      user.profileImage = req.file.path;
    }

    await user.save();
    const updatedUser = await User.findById(req.params.id).select("-password");
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
