import React, { useState } from 'react';
import { FaStar, FaUser, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const CourseDetails = () => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();

  const handleEnroll = () => {
    toast.success("Successfully enrolled in the course!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });

    // Block button immediately
    setIsEnrolled(true);

    // Navigate after 3 seconds (same as toast)
    setTimeout(() => {
      navigate("/student");
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <ToastContainer />

      {/* Banner */}
      <div className="relative bg-gradient-to-r from-orange-400 to-yellow-300 rounded-2xl p-6 text-white mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="bg-white text-orange-500 font-semibold px-3 py-1 rounded-full">Expert</span>
              <span className="bg-white text-orange-500 font-semibold px-3 py-1 rounded-full">Laravel Pro</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold max-w-xl">Resolving Conflicts Between Designers And Engineers</h2>
            <div className="flex items-center text-sm space-x-4 mt-2 text-white">
              <span className="flex items-center"><FaStar className="mr-1 text-yellow-300" /> 4.5 Reviews</span>
              <span className="flex items-center"><FaCalendarAlt className="mr-1" /> 24/07/2024</span>
              <span className="flex items-center"><FaUser className="mr-1" /> 2,250 Students</span>
            </div>
          </div>
          <img src="https://i.imgur.com/Um5g1L5.png" alt="Instructor" className="w-48 h-auto mt-6 md:mt-0" />
        </div>
      </div>

      {/* Course Description */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-2">Course Description</h3>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </p>

        <h3 className="text-xl font-semibold mb-2">Instructor</h3>
        <p className="text-gray-600 mb-4">Ahmad Bilal</p>

        <h4 className="text-lg font-semibold mb-3">What you'll learn in this course?</h4>
        <ul className="space-y-3 mb-6">
          {[
            'Work with color & Gradients & Grids',
            'All the useful shortcuts',
            'Be able to create Flyers, Brochures, Advertisements',
            'How to work with Images & Text'
          ].map(point => (
            <li key={point} className="flex items-center text-gray-800">
              <FaCheckCircle className="text-green-500 mr-2" /> {point}
            </li>
          ))}
        </ul>

        {/* Enroll Button */}
        <button
          onClick={handleEnroll}
          disabled={isEnrolled}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            isEnrolled
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          {isEnrolled ? "Enrolled" : "Enroll Now"}
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
