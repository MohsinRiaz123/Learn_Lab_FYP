import { FaBook, FaClock, FaFileAlt, FaUser } from "react-icons/fa";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FaFileSignature } from "react-icons/fa6";
import itc from"../../assets/Images/ITC.png"
import oop from"../../assets/Images/oop.png"
import pf from"../../assets/Images/pf.png"
import instructor from "../../assets/Images/zoya.png"
import { useNavigate } from "react-router-dom";

const dashboardStats = [
  { title: "ASSIGN COURSES", count: 30, icon: <FaBook /> },
  { title: "TOTAL STUDENTS", count: 120, icon: <MdOutlinePeopleAlt /> },
  { title: "TOTAL PUBLISH COURSES", count: 17, icon: <FaFileSignature /> },
];

const courses = [
  {
    id: 1,
    title: "Learning JavaScript With Imagination",
    instructor: "David Millar",
    rating: 4.5,
    img: itc,
    instructorImg: instructor
  },
  {
    id: 2,
    title: "The Complete Graphic Design for Beginners",
    instructor: "Wilson",
    rating: 4.5,
    img: oop,
    instructorImg: instructor
  },
  {
    id: 3,
    title: "Learning JavaScript With Imagination",
    instructor: "Warren",
    rating: 4.5,
    img: pf,
    instructorImg: instructor
  },
  {
    id: 4,
    title: "The Complete Graphic  for Beginners",
    instructor: "Wilson",
    rating: 4.5,
    img: itc,
    instructorImg: instructor
  },
  {
    id: 5,
    title: "Learning t With Imagination",
    instructor: "Warren",
    rating: 4.5,
    img: oop,
    instructorImg: instructor
  }
];
const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <div className="p-6">
      {/* Dashboard Cards */}
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-5 shadow flex items-center gap-4 ">
            <div className="bg-purple text-white p-5 rounded-full text-3xl">
              {stat.icon}
            </div>
            <div>
              <p className="text-xl font-bold">{stat.count}</p>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* In Progress */}
      <h2 className="text-xl font-bold mb-4">In Progress Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-6 2xl:gap-12">
        {courses.map(course => (
          <div key={course.id} className="bg-white shadow rounded-lg overflow-hidden" onClick={()=>navigate("/instructor/GenralCourseDetails")}>
            <img src={course.img} alt={course.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg leading-tight mb-1">{course.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <img src={course.instructorImg} className="w-6 h-6 rounded-full mr-2" />
                {course.instructor}
                <span className="text-yellow-500 ml-2">⭐ {course.rating} Reviews</span>
              </div>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
