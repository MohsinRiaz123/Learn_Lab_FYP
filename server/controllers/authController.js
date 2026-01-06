import User from "../models/User.js";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
export const registerStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate request
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Student registered successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Instructor Registration  

export const registerInstructor = async (req, res) => {
  try {
    console.log("File:", req.file); // debug Multer file upload
    console.log("Body:", req.body);  // debug form data

    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Generate instructor number
    const instructorCount = await User.countDocuments({ role: "instructor" });
    const instructorNumber = instructorCount + 1; // sequential number

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user without document first
    const newInstructor = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      instructorNumber,
    });

    // Rename file to instructorNumber
    const ext = path.extname(req.file.originalname);
    const newFilename = `${instructorNumber}${ext}`;
    const oldPath = req.file.path;
    const newPath = path.join("uploads", newFilename);

    fs.renameSync(oldPath, newPath);

    // Update user document with PDF filename
    newInstructor.document = newFilename;
    await newInstructor.save();

    return res.status(201).json({
      message: "Instructor registered",
      instructor: newInstructor,
    });

  } catch (error) {
    console.error("Error in registerInstructor:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Return user data (role, id, etc)
    res.status(200).json({
      id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};