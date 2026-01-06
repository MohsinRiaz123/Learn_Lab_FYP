import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String },
  date: { type: Date },
  skills: [{ type: String }],
  image: { type: Buffer }, // store image as binary
  imageType: { type: String }, // mime type for image
  video: { type: Buffer }, // store video as binary
  videoType: { type: String }, // mime type for video
  status: { type: String, default: "pending" }, // default pending
}, { timestamps: true });

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

export default mongoose.model("Course", courseSchema);
