import express from "express";
import User from "../models/User.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Multer storage for different file types
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/";
    if (file.fieldname === "profileImage") folder += "profiles";
    else if (file.fieldname === "resume") folder += "resumes";
    else if (file.fieldname === "certificate") folder += "certificates";

    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.params.id}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });

// GET user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE user info (personal, social, password, files)
router.put(
  "/:id",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Personal info
      const { firstName, lastName, email, phone, occupation, bio, currentPassword, newPassword } = req.body;
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (phone) user.phone = phone;
      if (occupation) user.occupation = occupation;
      if (bio) user.bio = bio;

      // Password update (add hash in production)
      if (currentPassword && newPassword) {
        // compare currentPassword with user.password (bcrypt) in production
        user.password = newPassword;
      }

      // File uploads
      if (req.files.profileImage) user.profileImage = req.files.profileImage[0].filename;
      if (req.files.resume) user.resume = req.files.resume[0].filename;
      if (req.files.certificate) user.certificate = req.files.certificate[0].filename;

      await user.save();
      res.json({ message: "User updated successfully", user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
