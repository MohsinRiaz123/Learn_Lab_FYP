import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa6";
const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  let timeoutId;
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    clearTimeout(timeoutId); // Clear any previous timeout
    setIsOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 200); // Delay of 1 second
  };

  return (
    <div className="bg-white shadow-lg shadow-gray-300  flex justify-between items-center px-4  sticky top-0 ">
      <a href="/" className="flex items-center">
        <p className="text-purple text-7xl">
          <FaGraduationCap />
        </p>
        <div className="pl-2">
          <p className="text-4xl font-semibold">LearnLab</p>
          <p className="text-xs font-semibold">GROW YOUR SKILLS</p>
        </div>
      </a>
      <div className="flex space-x-6 font-semibold">
        <Link to="/" className="hover:text-purple hover:underline">
          Home
        </Link>
        <Link to="/about" className="hover:text-purple hover:underline">
          About
        </Link>
        <Link to="/contact" className="hover:text-purple hover:underline">
          Contact Us
        </Link>
      </div>
      <div className="flex space-x-6 font-semibold">
        <div
          className="relative inline-block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Sign Up Button */}
          <button
            className="border-2 border-yellow px-5 py-2 rounded-full block text-center 
                   "
          >
            Sign Up
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute left-0 mt-2 w-32 bg-white border border-gray-300 rounded-xl shadow-lg">
              <a
                href="/studentSignup"
                className="block px-4 py-2 text-gray-700 hover:bg-purple hover:text-white rounded-xl"
              >
                Student
              </a>
              <a
                href="/instructorSignup"
                className="block px-4 py-2 text-gray-700 hover:bg-purple hover:text-white rounded-xl "
              >
                Instructor
              </a>
            </div>
          )}
        </div>
        <a
          href="/login"
          onClick={() => navigate("/login")}
          className=" border-2 border-yellow bg-yellow hover:bg-purple hover:border-purple hover:text-white   px-6 py-2  rounded-full transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-100"
        >
          Log in
        </a>
      </div>
    </div>
  );
};

export default LandingNavbar;
