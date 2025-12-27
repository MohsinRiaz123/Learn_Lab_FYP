import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaStar,
} from "react-icons/fa";

import itc from "../../assets/Images/ITC.png";
import oop from "../../assets/Images/oop.png";



const publishCourses = [
  {
    id: 1,
    title: "Intro to Computer Science",
    category: "Computer Science",
    image: itc,
    tags: ["Beginner", "Theory"],
    author: "Alice",
    rating: 4.6,
    complete: 20,
    stats: { lessons: 15, time: "8h 30m", comments: 18 },
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
    stats: { lessons: 25, time: "16h 15m", comments: 32 },
  },
];



const CreateCourse = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-white rounded-lg shadow w-[70%] mx-auto">
      <button
        className="px-6 py-2 rounded-xl bg-purple hover:bg-blue  text-lg text-white font-semibold flex items-center "
        onClick={() => navigate("/instructor/courseCreation")}
      >
        <span className="text-2xl pr-2">+</span> Add New Course
      </button>
      <h2 className="text-xl font-bold mb-4 mt-8">Publish Courses</h2>

      {/* Course Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {publishCourses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-300 rounded-xl overflow-hidden shadow-sm bg-white"
             onClick={() => navigate("/instructor/InsCourseDetails")}
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-md mb-2">{course.title}</h3>

              {/* Progress */}
             
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
};

export default CreateCourse;
