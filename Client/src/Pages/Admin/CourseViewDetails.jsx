import React from "react";
import { FaStar, FaUser, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

const CourseViewDetails = () => {
  return (
    <div className="max-w-5xl mx-auto p-4">

      {/* Banner */}
      <div className="relative bg-gradient-to-r from-orange-400 to-yellow-300 rounded-2xl p-6 text-white mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="bg-white text-orange-500 font-semibold px-3 py-1 rounded-full">
                Expert
              </span>
              <span className="bg-white text-orange-500 font-semibold px-3 py-1 rounded-full">
                Laravel Pro
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold max-w-xl">
              Resolving Conflicts Between Designers And Engineers
            </h2>

            <div className="flex items-center text-sm space-x-4 mt-2">
              <span className="flex items-center">
                <FaStar className="mr-1 text-yellow-300" /> 4.5 Reviews
              </span>
              <span className="flex items-center">
                <FaCalendarAlt className="mr-1" /> 24/07/2024
              </span>
              <span className="flex items-center">
                <FaUser className="mr-1" /> 2,250 Students
              </span>
            </div>
          </div>

          <img
            src="https://i.imgur.com/Um5g1L5.png"
            alt="Instructor"
            className="w-48 h-auto mt-6 md:mt-0"
          />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-2">Course Description</h3>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. This course
          helps designers and engineers collaborate effectively.
        </p>

        <h3 className="text-xl font-semibold mb-2">Instructor</h3>
        <p className="text-gray-600 mb-4">Ahmad Bilal</p>

        <h4 className="text-lg font-semibold mb-3">
          What you'll learn in this course?
        </h4>

        <ul className="space-y-3">
          {[
            "Work with color & gradients",
            "Professional UI techniques",
            "Design collaboration skills",
            "Better team communication",
          ].map((item) => (
            <li key={item} className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseViewDetails;
