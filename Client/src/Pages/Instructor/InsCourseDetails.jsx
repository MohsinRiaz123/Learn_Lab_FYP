import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InsCourseDetails = () => {
  const { id } = useParams();

  const [isSaving, setIsSaving] = useState(false);

  const [course, setCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  /* ================= FETCH COURSE BY ID ================= */
  useEffect(() => {
    if (!id) return;
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${id}`);
        const data = await res.json();
        setCourse(data);
        setCourse({
          ...data,
          image: data.image
            ? `http://localhost:5000/api/courses/${id}/image`
            : "",
          video: data.video
            ? `http://localhost:5000/api/courses/${id}/video`
            : "",
        });
      } catch (err) {
        console.error("Failed to load course", err);
      }
    };

    fetchCourse();
  }, [id]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
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

  const toggleEdit = async () => {
    // ENTER EDIT MODE
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    // SAVE CHANGES
    try {
      setIsSaving(true);

      const payload = {
        title: course.title,
        instructor: course.instructor,
        description: course.description,
        date: course.date,
        skills: course.skills,
      };

      const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to update course");
      }

      // ✅ SUCCESS → exit edit mode
      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  if (!course) return <p className="text-center mt-10">Loading...</p>;

  /* ================= UI ================= */
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-600">
          {isEditing ? "Edit Course" : "Course Details"}
        </h2>

        <button
          onClick={toggleEdit}
          disabled={isSaving}
          className={`px-5 py-2 text-white rounded-lg shadow transition
    ${
      isSaving
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700"
    }`}
        >
          {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Edit"}
        </button>
      </div>

      {/* Title */}
      <div className="mb-5">
        <label className="font-semibold text-gray-700">Title</label>
        {isEditing ? (
          <input
            name="title"
            value={course.title}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          />
        ) : (
          <p className="mt-1 text-gray-800">{course.title}</p>
        )}
      </div>

      {/* Instructor */}
      <div className="mb-5">
        <label className="font-semibold text-gray-700">Instructor</label>
        {isEditing ? (
          <input
            name="instructor"
            value={course.instructor}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg px-3 py-2"
          />
        ) : (
          <p className="mt-1">{course.instructor}</p>
        )}
      </div>

      {/* Date */}
      <div className="mb-5">
        <label className="font-semibold text-gray-700">Date</label>
        {isEditing ? (
          <input
            type="date"
            name="date"
            value={course.date?.slice(0, 10)}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg px-3 py-2"
          />
        ) : (
          <p className="mt-1">{course.date?.slice(0, 10)}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className="font-semibold text-gray-700">Description</label>
        {isEditing ? (
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            rows={4}
            className="w-full mt-1 border rounded-lg px-3 py-2"
          />
        ) : (
          <p className="mt-1 text-gray-700">{course.description}</p>
        )}
      </div>

      {/* Skills */}
      <div className="mb-6">
        <label className="font-semibold text-gray-700">
          Skills You'll Learn
        </label>

        <div className="mt-2 space-y-2">
          {course.skills.map((skill, index) => (
            <div key={index}>
              {isEditing ? (
                <input
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />
              ) : (
                <li className="ml-5 list-disc text-gray-700">{skill}</li>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <button
            onClick={addSkillField}
            className="mt-3 text-sm text-indigo-600 hover:underline"
          >
            + Add Skill
          </button>
        )}
      </div>

      {/* Image */}
      <div className="mb-6">
        <label className="font-semibold text-gray-700">Course Image</label>

        <img
          src={course.image}
          alt="Course"
          className="mt-3 max-w-52 max-h-52 object-cover rounded-xl shadow"
        />
      </div>

      {/* Video */}
      <div>
        <label className="font-semibold text-gray-700">Course Video</label>

        <video
          controls
          src={course.video}
          className="mt-3 w-full rounded-xl shadow"
        />
      </div>
    </div>
  );
};

export default InsCourseDetails;
