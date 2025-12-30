import express from "express";
import multer from "multer"; 
import { registerStudent, loginUser,registerInstructor } from "../controllers/authController.js";
import path from "path";
const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed"));
  }
});

router.post("/signup", registerStudent);
router.post("/instructor-signup", upload.single("document"), registerInstructor);
router.post("/login", loginUser);

export default router;
