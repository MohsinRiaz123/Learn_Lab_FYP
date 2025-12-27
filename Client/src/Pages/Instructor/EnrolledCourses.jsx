import {
  FaUserGraduate,
  FaStar,
} from "react-icons/fa";

import itc from "../../assets/Images/ITC.png";
import oop from "../../assets/Images/oop.png";


const enrolledCourses = [
  {
    id: 1,
    title: "Intro to Computer Science",
    image: itc,
    author: "Alice",
    rating: 4.6,
  },
  {
    id: 2,
    title: "Object-Oriented Programming",
    image: oop,
    author: "Bob",
    rating: 4.8,
  },
];
const EnrolledCourses = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow w-[70%] mx-auto">
      <h2 className="text-xl font-bold mb-4">Assign Courses</h2>

      {/* Course Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-300 rounded-xl overflow-hidden shadow-sm bg-white"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-md mb-2">{course.title}</h3>

              {/* Author & Reviews */}
              <div className="flex items-center text-sm text-gray-600 gap-1">
                <FaUserGraduate className="text-gray-500" />
                <span>{course.author}</span>
                <FaStar className="ml-4 text-yellow-500" />
                <span>({course.rating} Reviews)</span>
              </div>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default EnrolledCourses;
