import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
const LandingFooter = () => {
  return (
    <div className=" ">
    <div className=" text-gray-500 font-semibold  space-x-14 space-y-18 bg-blue md:grid grid-cols-2 lg:grid-cols-4 pt-14 px-14 ">
      <div className="">
        <div className="flex items-center">
          <p className="text-purple text-6xl">
            <FaGraduationCap />
          </p>
          <div className="pl-2 text-white">
            <p className="text-4xl ">LearnLab</p>
            <p className="text-xs">GROW YOUR SKILLS</p>
          </div>
        </div>
        <p className="mt-8">
        Access high-quality courses from expert instructors and upgrade your skills at your own pace.
        </p>
        <p className="mt-4">Lahore, Pakistan</p>
        <p className="mt-4">+92 300 1672003</p>
      </div>
      <div>
        <p className="text-white text-xl">Useful Links</p>
        <div className="bg-purple h-1 w-8 rounded-full mt-3"></div>
        <div className=" mt-4 space-y-2 flex flex-col">
          <a href="/" className=" hover:text-white">
            Our Values
          </a>
          <a href="/" className=" hover:text-white">
            Our Partners
          </a>
          <a href="/" className=" hover:text-white">
            Work at Future Learn
          </a>
        </div>
      </div>

      <div>
        <p className="text-white text-xl">Our Company</p>
        <div className="bg-purple h-1 w-8 rounded-full mt-3"></div>
        <div className=" mt-4 space-y-2 flex flex-col">
          <a href="/contact" className=" hover:text-white">
            Contact Us
          </a>
          <a href="/about" className=" hover:text-white">
            About
          </a>
          <a href="/" className=" hover:text-white">
            Become Instructor
          </a>
        </div>
      </div>
      <div>
        <p className="text-white text-xl">Get In Touch</p>
        <div className="bg-purple h-1 w-8 rounded-full mt-3"></div>
        <div className=" mt-4  ">
          <p>Have questions or need assistance? Reach out to us we're here to help</p>
          <div className="flex space-x-3 mt-4">
            <a href="/" className=" hover:text-white text-xl">
              <FaFacebookF />
            </a>
            <a href="/" className=" hover:text-white text-xl">
              <FaTwitter />
            </a>
            <a href="/" className=" hover:text-white text-xl">
              <RiInstagramFill />
            </a>
            <a href="/" className=" hover:text-white text-xl">
              <FaLinkedinIn />
            </a>
            <a href="/" className=" hover:text-white text-xl">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="h-14 bg-purple text-white flex items-center justify-center font-semibold ">
    <p >&copy; 2022 - {new Date().getFullYear()} LearnLab.com. All rights reserved.</p>
    </div>
    </div>
  );
};

export default LandingFooter;
