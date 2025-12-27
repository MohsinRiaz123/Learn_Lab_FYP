import React, { useState } from "react";

const initialCourseData = {
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

const InsCourseDetails = () => {
  const [course, setCourse] = useState(initialCourseData);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourse((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourse((prev) => ({
        ...prev,
        video: URL.createObjectURL(file),
      }));
    }
  };

  const handleSkillChange = (index, value) => {
    const updated = [...course.skills];
    updated[index] = value;
    setCourse((prev) => ({ ...prev, skills: updated }));
  };

  const addSkillField = () => {
    setCourse((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-600">
          {isEditing ? "Edit Course" : "Course Details"}
        </h2>
        <button
          onClick={toggleEdit}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="font-semibold">Title:</label>
        {isEditing ? (
          <input
            name="title"
            value={course.title}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1 mt-1"
          />
        ) : (
          <p>{course.title}</p>
        )}
      </div>

      {/* Instructor */}
      <div className="mb-4">
        <label className="font-semibold">Instructor:</label>
        {isEditing ? (
          <input
            name="instructor"
            value={course.instructor}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1 mt-1"
          />
        ) : (
          <p>{course.instructor}</p>
        )}
      </div>

      {/* Date */}
      <div className="mb-4">
        <label className="font-semibold">Date:</label>
        {isEditing ? (
          <input
            type="date"
            name="date"
            value={course.date}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1 mt-1"
          />
        ) : (
          <p>{course.date}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="font-semibold">Description:</label>
        {isEditing ? (
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-2 py-1 mt-1"
          />
        ) : (
          <p>{course.description}</p>
        )}
      </div>

      {/* Skills */}
      <div className="mb-4">
        <label className="font-semibold">Skills You'll Learn:</label>
        <div className="mt-2 space-y-2">
          {course.skills.map((skill, index) => (
            <div key={index}>
              {isEditing ? (
                <input
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="w-full border rounded px-2 py-1"
                />
              ) : (
                <li>{skill}</li>
              )}
            </div>
          ))}
        </div>
        {isEditing && (
          <button
            onClick={addSkillField}
            className="text-sm text-blue-600 hover:underline mt-2"
          >
            + Add Skill
          </button>
        )}
      </div>

      {/* Image */}
      <div className="mb-4">
        <label className="font-semibold">Course Image:</label>
        {isEditing ? (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-2 "
          />
        ) : null}
        <img
          src={course.image}
          alt="Course"
          className="mt-2 rounded shadow w-full max-h-60 object-cover"
        />
      </div>

      {/* Video */}
      <div className="mb-4">
        <label className="font-semibold">Course Video:</label>
        {isEditing ? (
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="w-full mt-2"
          />
        ) : null}
        <video
          controls
          src={course.video}
          className="mt-2 w-full rounded shadow"
        />
      </div>
    </div>
  );
};

export default InsCourseDetails;
