import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";

// Default images for placeholder if course has no image
import itc from "../../assets/Images/ITC.png";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [publishCourses, setPublishCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchCourses = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/api/courses/instructor/${user.id}`
        );

        const data = await res.json();

        if (Array.isArray(data)) {
          setPublishCourses(
            data.map((course) => ({
              id: course._id,
              title: course.title,
              category: course.category || "General",
              image: course.image
                ? `http://localhost:5000/api/courses/${course._id}/image`
                : itc,
              video: course.video
                ? `http://localhost:5000/api/courses/${course._id}/video`
                : null,
              tags: course.skills || [],
              author: user.firstName + " " + user.lastName,
              status: course.status || "pending",
            }))
          );
        } else {
          setPublishCourses([]);
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setPublishCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user?.id]);

  return (
    <div className="p-6 bg-white rounded-lg shadow w-[70%] mx-auto">
      <button
        className="px-6 py-2 rounded-xl bg-purple hover:bg-blue  text-lg text-white font-semibold flex items-center "
        onClick={() => navigate("/instructor/courseCreation")}
      >
        <span className="text-2xl pr-2">+</span> Add New Course
      </button>
      <h2 className="text-xl font-bold mb-4 mt-8">Publish Courses</h2>

      {/* Loading */}
      {loading && (
        <p className="text-center col-span-full text-gray-500 text-lg">
          Loading courses...
        </p>
      )}

      {/* No Data */}
      {!loading && publishCourses.length === 0 && (
        <p className="text-center col-span-full text-gray-500 text-lg">
          No courses found
        </p>
      )}

      {/* Course Cards */}
      {!loading && publishCourses.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          {publishCourses.map((course) => (
            <div
              key={course.id}
              className="border border-gray-300 rounded-xl overflow-hidden shadow-sm bg-white cursor-pointer hover:shadow-md transition"
              onClick={() =>
                navigate(`/instructor/InsCourseDetails/${course.id}`)
              }
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-md mb-2">{course.title}</h3>

                <div className="flex items-center text-sm text-gray-600 gap-1">
                  <FaUserGraduate className="text-gray-500" />
                  <span>{course.author}</span>
                  <span className="ml-auto font-medium text-purple">
                    {course.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateCourse;
