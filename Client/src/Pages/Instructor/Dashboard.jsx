import { useEffect, useState } from "react";
import { FaFileSignature } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({ active: 0, pending: 0 });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({}); // 🔹 Track image load

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      try {
        const coursesRes = await fetch(
          "http://localhost:5000/api/courses/status/active"
        );
        const coursesData = await coursesRes.json();

        const statsRes = await fetch(
          `http://localhost:5000/api/courses/stats/${user.id}`
        );
        const statsData = await statsRes.json();

        setCourses(coursesData);
        setStats(statsData);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="bg-white rounded-lg p-5 shadow flex items-center gap-4">
          <div className="bg-purple text-white p-5 rounded-full text-3xl">
            <FaFileSignature />
          </div>
          <div>
            <p className="text-xl font-bold">{stats.active}</p>
            <p className="text-sm text-gray-600">ACTIVE COURSES</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow flex items-center gap-4">
          <div className="bg-yellow text-white p-5 rounded-full text-3xl">
            <FaFileSignature />
          </div>
          <div>
            <p className="text-xl font-bold">{stats.pending}</p>
            <p className="text-sm text-gray-600">PENDING COURSES</p>
          </div>
        </div>
      </div>

      {/* Courses */}
      <h2 className="text-xl font-bold mb-4">Active Courses</h2>

      {courses.length === 0 ? (
        <p className="text-gray-500">No active courses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white shadow rounded-lg overflow-hidden cursor-pointer"
              onClick={() =>
                navigate(`/instructor/GenralCourseDetails/${course._id}`)
              }
            >
              {/* IMAGE CONTAINER */}
              <div className="relative w-full h-64 bg-gray-100">
                {!imageLoaded[course._id] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple"></div>
                  </div>
                )}

                <img
                  src={course.imageSrc || "/placeholder.png"}
                  alt={course.title}
                  className={`w-full h-64 object-cover transition-opacity duration-300 ${
                    imageLoaded[course._id] ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() =>
                    setImageLoaded((prev) => ({
                      ...prev,
                      [course._id]: true,
                    }))
                  }
                  onError={(e) => {
                    e.target.src = "/placeholder.png";
                    setImageLoaded((prev) => ({
                      ...prev,
                      [course._id]: true,
                    }));
                  }}
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                <p className="text-sm text-gray-500">
                  Instructor: {course.instructor}
                </p>
                <span className="text-yellow-500 text-sm">
                  ⭐ {course.rating} Reviews
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
