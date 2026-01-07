import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "instructor", "industryExpert", "admin"],
      default: "student",
    },
    resume: { type: String }, // existing field for instructor resume

    // New fields for profile settings
    phone: { type: String, default: "" },
    occupation: { type: String, default: "" },
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "" }, // store URL/path of uploaded image
    socialLinks: {
      twitter: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
