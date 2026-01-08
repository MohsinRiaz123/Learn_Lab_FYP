import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import path from "path";
dotenv.config();
connectDB();

const app = express();
// Middleware
app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: false, // if you use cookies/auth
}));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing form-data

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
// Routes
app.use("/api/auth", authRoutes);

app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);

app.use("/api/dashboard", dashboardRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("LearnLab Backend API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
