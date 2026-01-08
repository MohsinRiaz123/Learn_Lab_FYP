import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const GenralCourseDetails = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);

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
  if (!course) return <p className="text-center mt-10">Loading...</p>;

  /* ================= UI ================= */
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      {/* Title */}
      <div className="mb-5">
        <label className="font-semibold text-gray-700">Title</label>

        <p className="mt-1 text-gray-800">{course.title}</p>
      </div>

      {/* Instructor */}
      <div className="mb-5">
        <label className="font-semibold text-gray-700">Instructor</label>
        <p className="mt-1 text-gray-800">{course.instructor}</p>
      </div>

      {/* Date */}
      <div className="mb-5">
        <label className="font-semibold text-gray-700">Date</label>
        <p className="mt-1 text-gray-800">{course.date?.slice(0, 10)}</p>
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className="font-semibold text-gray-700">Description</label>
        <p className="mt-1 text-gray-800">{course.description}</p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <label className="font-semibold text-gray-700">
          Skills You'll Learn
        </label>

        <div className="mt-2 space-y-2">
          {course.skills.map((skill, index) => (
            <div key={index}>
              <li className="mt-1 text-gray-800">{skill}</li>
            </div>
          ))}
        </div>
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

export default GenralCourseDetails;
