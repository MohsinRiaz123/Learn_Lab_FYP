import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCourseScreen = () => {

  const user = JSON.parse(localStorage.getItem("user"));


  const [formData, setFormData] = useState({
    title: "",
    instructor: user ? `${user.firstName} ${user.lastName}` : "",
    instructorId: user ? user.id : "",
    image: null,
    description: "",
    skills: [""],
    date: "",
    video: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const addSkillField = () => {
    setFormData((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  };

  const handleSubmit = async (e) => {
    console.log("Submitting form with data:", formData);
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("instructor", formData.instructor);
    data.append("instructorId", formData.instructorId);
    data.append("description", formData.description);
    data.append("date", formData.date);
    data.append("skills", JSON.stringify(formData.skills)); // Send as string
    if (formData.image) data.append("image", formData.image);
    if (formData.video) data.append("video", formData.video);

    try {
      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      toast.success("Course created successfully!");
      // Reset form
      setFormData({
        title: "",
        instructor: user ? `${user.firstName} ${user.lastName}` : "",
        instructorId: user ? user.id : "",
        image: null,
        description: "",
        skills: [""],
        date: "",
        video: null,
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-xl mt-10">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-purple mb-6">Create New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Course Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "image")}
            className="w-full p-2 border rounded-md"
            required
          />
          {formData.image && (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="mt-2 h-40 rounded shadow"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Course Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileChange(e, "video")}
            className="w-full p-2 border rounded-md"
            required
          />
          {formData.video && (
            <video
              controls
              className="mt-2 w-full rounded shadow"
              src={URL.createObjectURL(formData.video)}
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Course Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Course Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            What You'll Learn
          </label>
          {formData.skills.map((skill, index) => (
            <input
              key={index}
              type="text"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              className="w-full p-2 mb-2 border rounded-md"
              placeholder={`Skill ${index + 1}`}
              required
            />
          ))}
          <button
            type="button"
            onClick={addSkillField}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add more
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-purple hover:bg-blue text-white font-semibold py-2 px-4 rounded-md"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourseScreen;
