import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const courseData = {
  id: "course_react_mastery",
  title: "Mastering React for Web Development",
  instructor: "Sarah Johnson",
  date: "2025-08-15",
  description:
    "This comprehensive course takes you from the fundamentals to advanced concepts of React. Learn how to build high-performance, scalable web applications with real-world projects.",
  image:
    "https://miro.medium.com/v2/resize:fit:1400/1*MF5V_dkybUTcfzwHFh0VSw.jpeg",
  video: "https://www.w3schools.com/html/mov_bbb.mp4",
  skills: [
    "Understand JSX, Components, and State Management",
    "Build SPAs with React Router",
    "Use Hooks like useState and useEffect effectively",
    "Integrate APIs and manage data with Axios",
    "Optimize React apps for performance",
    "Deploy applications using Vercel or Netlify",
  ],
};

const GenralCourseDetails = () => {
  const navigate = useNavigate();
  const handleRequestAssign = () => {
    toast.success(`Request sent to assign: "${courseData.title}"`, {
      position: "top-center",
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate("/instructor");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <ToastContainer />

      {/* Request Button */}
      <div className="mt-6 text-right">
        <button
          onClick={handleRequestAssign}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
        >
          Request for Assign
        </button>
      </div>
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">
        Course Details
      </h2>

      {/* Title */}
      <div className="mb-4">
        <label className="font-semibold">Title:</label>
        <p>{courseData.title}</p>
      </div>

      {/* Instructor */}
      <div className="mb-4">
        <label className="font-semibold">Instructor:</label>
        <p>{courseData.instructor}</p>
      </div>

      {/* Date */}
      <div className="mb-4">
        <label className="font-semibold">Date:</label>
        <p>{courseData.date}</p>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="font-semibold">Description:</label>
        <p>{courseData.description}</p>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <label className="font-semibold">Skills You'll Learn:</label>
        <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
          {courseData.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* Image */}
      <div className="mb-4">
        <label className="font-semibold">Course Image:</label>
        <img
          src={courseData.image}
          alt="Course"
          className="mt-2 rounded shadow w-full max-h-60 object-cover"
        />
      </div>

      {/* Video */}
      <div className="mb-4">
        <label className="font-semibold">Course Video:</label>
        <video
          controls
          src={courseData.video}
          className="mt-2 w-full rounded shadow"
        />
      </div>
    </div>
  );
};

export default GenralCourseDetails;
