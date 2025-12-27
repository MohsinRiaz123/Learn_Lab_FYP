import React, { useState } from "react";
import {
  FaClock,
  FaUserGraduate,
  FaClipboardList,
  FaComment,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import itc from "../../assets/Images/ITC.png";
import oop from "../../assets/Images/oop.png";
import pf from "../../assets/Images/pf.png";

const tabs = ["Enrolled Courses", "Completed Courses"];

const enrolledCourses = [
  {
    id: 1,
    title: "Intro to Computer Science",
    category: "Computer Science",
    image: itc,
    tags: ["Beginner", "Theory"],
    author: "Alice",
    rating: 4.6,
    complete: 20,
  },
  {
    id: 2,
    title: "Object-Oriented Programming",
    category: "Programming",
    image: oop,
    tags: ["Intermediate", "Java"],
    author: "Bob",
    rating: 4.8,
    complete: 60,
  },
];

// const activeCourses = [
//   {
//     id: 1,
//     title: "Python Fundamentals",
//     category: "Development",
//     image: pf,
//     tags: ["Intermediate", "Python"],
//     author: "Charlie",
//     rating: 4.7,
//     stats: { lessons: 12, time: "10h 20m", comments: 20 },
//   },
// ];

const completedCourses = [
  {
    id: 1,
    title: "The Complete Graphic Design for Beginners",
    category: "Design",
    image: oop,
    tags: ["Beginner", "Crush Course"],
    author: "Wilson",
    rating: 4.5,
    complete: 100,
  },
  {
    id: 2,
    title: "Learning JavaScript With Imagination",
    category: "Data Science",
    image: pf,
    tags: ["Marketing", "Pro Expert"],
    author: "Warren",
    rating: 4.5,
    complete: 100,
  },
  {
    id: 3,
    title: "Advanced JavaScript",
    category: "Development",
    image: oop,
    tags: ["Expert", "Laravel Pro"],
    author: "David Millar",
    rating: 4.5,
    complete: 100,
  },
];

const EnrolledCourses = () => {
  const [activeTab, setActiveTab] = useState("Enrolled Courses");
  const navigate = useNavigate();
  const getCourses = () => {
    switch (activeTab) {
      // case "Active Courses":
      //   return activeCourses;
      case "Completed Courses":
        return completedCourses;
      case "Enrolled Courses":
      default:
        return enrolledCourses;
    }
  };

  const courses = getCourses();

  return (
    <div className="p-6 bg-white rounded-lg shadow w-[70%] mx-auto">
      <h2 className="text-xl font-bold mb-4">Enrolled Courses</h2>

      {/* Tabs */}
      <div className="flex space-x-6 mb-6 text-sm font-medium">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab
                ? "border-b-4 border-purple text-purple"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Course Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`border border-gray-300 rounded-xl overflow-hidden shadow-sm bg-white ${
              activeTab !== "Completed Courses"
                ? "cursor-pointer hover:shadow-md"
                : ""
            }`}
            onClick={() =>
              activeTab !== "Completed Courses" && navigate("/student/learning")
            }
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <span className="inline-block bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded-full mb-2">
                {course.category}
              </span>
              <h3 className="font-semibold text-md mb-2">{course.title}</h3>

              {/* Author & Reviews */}
              <div className="flex items-center text-sm text-gray-600 gap-1">
                <FaUserGraduate className="text-gray-500" />
                <span>{course.author}</span>
                <FaStar className="ml-4 text-yellow-500" />
                <span>({course.rating} Reviews)</span>
              </div>
              {/* Progress */}
              {activeTab !== "Active Courses" && (
                <>
                  <div className="mt-4 text-sm text-gray-600">COMPLETE</div>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-1 mb-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${course.complete}%` }}
                    ></div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
