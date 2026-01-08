import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    // ---------------- BASIC INFO (UNCHANGED) ----------------
    title: { type: String, required: true },

    // Keeping instructor name string (your previous work)
    instructor: { type: String, required: true },

    // Instructor reference (already used by you)
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    description: { type: String },
    date: { type: Date },
    skills: [{ type: String }],

    // ---------------- MEDIA (UNCHANGED) ----------------
    image: { type: Buffer },        // store image as binary
    imageType: { type: String },    // mime type for image

    video: { type: Buffer },        // store video as binary
    videoType: { type: String },    // mime type for video

    // ---------------- COURSE STATUS (ENHANCED) ----------------
    status: {
      type: String,
      enum: ["pending", "active", "rejected"],
      default: "pending",
    },

    // ---------------- NEW (NON-BREAKING ADDITIONS) ----------------
    rating: {
      type: Number,
      default: 0,
    },

    totalStudents: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ---------------- VIRTUALS (UNCHANGED) ----------------
courseSchema.virtual("imageSrc").get(function () {
  if (this.image != null && this.imageType != null) {
    return `data:${this.imageType};base64,${this.image.toString("base64")}`;
  }
});

courseSchema.virtual("videoSrc").get(function () {
  if (this.video != null && this.videoType != null) {
    return `data:${this.videoType};base64,${this.video.toString("base64")}`;
  }
});

// ---------------- INDEX (OPTIONAL BUT SAFE) ----------------
courseSchema.index({ instructorId: 1, status: 1 });

export default mongoose.models.Course || mongoose.model("Course", courseSchema);

