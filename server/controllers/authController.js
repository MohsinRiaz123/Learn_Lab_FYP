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

// Register Instructor
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

    // Read file buffer
    const resumeBuffer = fs.readFileSync(req.file.path);
    const resumeBase64 = resumeBuffer.toString("base64");
    const resumeMimeType = req.file.mimetype; // e.g., application/pdf

    // Create user document with resume stored in DB
    const newInstructor = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      instructorNumber,
      status: "inactive",
      resume: {
        data: resumeBase64,
        contentType: resumeMimeType,
        filename: req.file.originalname,
      },
    });

    // Delete local file after storing in DB
    fs.unlinkSync(req.file.path);

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
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🚫 BLOCK INACTIVE USERS
    if (user.status === "inactive") {
      return res.status(403).json({
        message:
          "Your ID is inactive. Contact the team if it has been inactive for more than 2 days.",
      });
    }

    res.status(200).json({
      _id: user._id,
      role: user.role,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      status: user.status,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
