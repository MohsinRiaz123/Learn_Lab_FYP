import React, { useState, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import LandingFooter from "../../Components/LandingFooter";
import LandingNavbar from "../../Components/LandingNavbar";
import { useNavigate } from "react-router-dom";
const courses = [
  {
    img: "./src/assets/Images/ITC.png",
    title: "Introduction To Computer ",
    rating: "4.8",
    by: "Dr Nabeel Sabir Khan",
  },
  {
    img: "./src/assets/Images/pf.png",
    title: "Programming Fundamentals",
    rating: "4.7",
    by: "Dr Nabeel Sabir Khan",
  },
  {
    img: "./src/assets/Images/oop.png",
    title: "Object Oriented Programming",
    rating: "4.9",
    by: "Dr Nabeel Sabir Khan",
  },
  {
    img: "./src/assets/Images/dsa.jpg",
    title: "Data Structure And Algorithm",
    rating: "4.9",
    by: "Dr Nabeel Sabir Khan",
  },
];
const journey = [
  {
    img: "./src/assets/Images/experts.svg",
    title: "Learn with Experts ",
  },
  {
    img: "./src/assets/Images/learn.svg",
    title: "Learn Anything",
  },
  {
    img: "./src/assets/Images/certificates.svg",
    title: "Get Online Certificate",
  },
];

const AnimatedCounter = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) observer.observe(counterRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const step = Math.ceil(value / 50);
      const interval = setInterval(() => {
        start += step;
        if (start >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(start);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isVisible, value]);

  return (
    <div ref={counterRef} className="text-center">
      <h2 className="text-6xl font-bold text-white">
        {count.toLocaleString()}K+
      </h2>
      <p className="text-white text-xl">{label}</p>
    </div>
  );
};

const stats = [
  { value: 45, label: "Active Students" },
  { value: 89, label: "Faculty Courses" },
  { value: 156, label: "Best Professors" },
  { value: 42, label: "Award Achieved" },
];
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <LandingNavbar />
      <div className=" space-y-15">
        <div className=" mx-20 lg:flex justify-around ">
          <div className="flex flex-col justify-center  space-y-5 p-24 lg:w-1/2">
            <p className="text-3xl 2xl:text-5xl  ">
              Never Stop
              <span className="ml-2 p-2 font-bold text-white bg-yellow  rounded-bl-4xl rounded-tr-4xl">
                Learning
              </span>
            </p>
            <p className="text-3xl  mt-2 2xl:text-5xl 2xl:mt-5">
              {" "}
              Life <span className="font-bold">Never Stop</span> Teaching
            </p>
            <p className="text-gray-400 font-semibold  text-lg mt-5 ">
              Every teaching and learning journey is unique Following <br />{" "}
              We'll help guide your way.
            </p>
            <button
              onClick={() => navigate("/studentSignup")}
              className=" shadow-lg shadow-blue hover:shadow-none flex items-center rounded-full bg-purple w-fit p-4 font-semibold text-white hover:bg-yellow hover:text-black transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-100 "
            >
              Start Free Trial{" "}
              <span className="pl-2">
                <FaArrowRight />
              </span>
            </button>
          </div>
          <div className=" flex lg:w-1/2 items-center justify-center">
            <img src="./src/assets/Images/Banner.png" alt="image" />
          </div>
        </div>
        {/* <_____________________Running Counters____________________> */}

        <div className="bg-purple p-10 rounded-2xl flex justify-around items-center max-w-7xl mx-auto shadow-lg shadow-blue ">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <AnimatedCounter value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
        {/* <_____________________Thousands of  Courses____________________> */}

        <div className="lg:flex justify-around ">
          <div className=" flex lg:w-1/2 items-center justify-center">
            <img src="./src/assets/Images/liveClass.png" alt="image" />
          </div>
          <div className="flex flex-col justify-center  space-y-3 p-24 font-semibold  lg:w-1/2">
            <p className="text-purple ml-5">Get More About Us</p>
            <p className="text-3xl 2xl:text-5xl  ">
              Thousand Of Top
              <span className="ml-2 p-2 font-bold text-white bg-yellow  rounded-bl-4xl rounded-tr-4xl">
                Courses
              </span>
            </p>
            <p className="text-3xl 2xl:text-5xl  mt-2 2xl:mt-5">Now in One Place</p>
            <p className="text-gray-400  text-lg mt-5 ">
              Access thousands of high-quality courses in one platform.
              <br /> Learn new skills, grow your career, and explore
              <br /> top-rated content now
            </p>
            <div className="flex space-x-2 items-center">
              <span className=" bg-yellow p-2 rounded-full">
                <FaArrowRight />
              </span>
              <p>The Most World Class Instructors </p>
            </div>
            <div className="flex space-x-2 items-center">
              <span className=" bg-yellow p-2 rounded-full">
                <FaArrowRight />
              </span>
              <p>Access Your Class anywhere </p>
            </div>
            <div className="flex space-x-2 items-center">
              <span className=" bg-yellow p-2 rounded-full">
                <FaArrowRight />
              </span>
              <p>Flexible Course Plan</p>
            </div>

            <button onClick={()=>navigate("/studentSignup")} className=" shadow-lg shadow-blue hover:shadow-none flex items-center rounded-full bg-purple  mt-4 w-fit p-4 font-semibold text-white hover:bg-yellow hover:text-black transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-100 ">
              Start Free Trial{" "}
              <span className="pl-2">
                <FaArrowRight />
              </span>
            </button>
          </div>
        </div>

        {/* <_____________________How We Start____________________> */}
        <div className="relative bg-blue">
          <div className="pt-20 pb-60  flex flex-col items-center justify-center space-y-6 ">
            <div className=" bg-purple text-white  rounded-full py-2 px-4 font-semibold w-fit">
              How We Start Journey
            </div>
            <p className="text-white font-bold text-4xl">
              Start your Learning Journey Today!
            </p>
            <div className=" flex  space-x-36 justify-center">
              {journey.map((journey, index) => (
                <div className="space-y-3">
                  <div className="flex justify-center">
                    {" "}
                    <img src={journey.img} alt="img" className="  " />
                  </div>

                  <p className="font-semibold text-white text-lg">
                    {journey.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className=" lg:absolute top-110 left-0 z-40 flex justify-around w-full px-10">
            <div className="lg:flex bg-white border border-gray-400 pt-4 rounded-2xl w-[45%]">
              <img
                src="./src/assets/Images/instructor.png"
                alt="instructor image"
                className="relative pl-2 z-30 "
              />
              <div className="hidden lg:block absolute top-10 w-45 h-45 rounded-full bg-yellow   "></div>
              <div className="pl-6 space-y-6">
                <p className="text-2xl 2xl:text-3xl font-bold hover:text-yellow">
                  Become a Instructor
                </p>
                <p className="text-md 2xl:text-lg font-semibold flex-wrap text-gray-400">
                  Share your expertise, inspire learners, and grow your teaching
                  career with us
                </p>
                <button onClick={()=>navigate("/instructorSignup")} className=" shadow-lg shadow-blue  hover:shadow-none flex items-center rounded-full bg-purple  mt-4 w-fit p-4 font-semibold text-white hover:bg-yellow hover:text-black transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-100 ">
                  Apply Now{" "}
                  <span className="pl-2">
                    <FaArrowRight />
                  </span>
                </button>
              </div>
            </div>
            <div className="lg:flex bg-white border border-gray-400 pt-4 rounded-2xl w-[45%]">
              <img
                src="./src/assets/Images/students.png"
                alt="Student image"
                className="relative pl-2 z-30 "
              />
              <div className="hidden lg:block absolute top-10 w-45 h-45 rounded-full bg-yellow   "></div>
              <div className="pl-6 space-y-6">
                <p className="text-2xl 2xl:text-3xl font-bold hover:text-yellow">
                  Become a Student
                </p>
                <p className="text-md 2xl:text-lg font-semibold flex-wrap text-gray-400">
                  Learn from industry experts, gain new skills, and shape your
                  future
                </p>
                <button onClick={()=>navigate("/studentSignup")} className=" shadow-lg shadow-blue  hover:shadow-none flex items-center rounded-full bg-purple  mt-4 w-fit p-4 font-semibold text-white hover:bg-yellow hover:text-black transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-100 ">
                  Apply Now{" "}
                  <span className="pl-2">
                    <FaArrowRight />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <_____________________Top Class Courses____________________> */}
        <div className=" mt-60 space-y-10">
          <div className=" flex  items-center  flex-col font-semibold w-full space-y-3 ">
            <p className="text-purple">Top Class Courses</p>
            <p className="text-5xl">Explore Our World's Best Courses</p>
          </div>
          <div className="flex  space-x-6 justify-center">
            {courses.map((courses, index) => (
              <div className="w-72 border border-2 space-y-3 border-purple rounded-lg px-2 py-4 hover:shadow-lg shadow-blue">
                <div className="flex justify-center">
                  {" "}
                  <img
                    src={courses.img}
                    alt="img"
                    className=" h-56 rounded-lg object-fill  "
                  />
                </div>

                <p className="font-semibold hover:underline flex-wrap">
                  {courses.title}
                </p>

                <div className="text-sm flex justify-between items-center font-semibold">
                  <p className="">
                    By <span className="text-gray-400">{courses.by}</span>
                  </p>{" "}
                </div>
                <div className="flex items-center justify-between">
                  <button className="  bg-purple hover:bg-yellow font-semibold hover:shadow-none py-1 px-3 rounded-lg  shadow-md shadow-blue text-white hover:text-black flex  items-center transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-100 ">
                    Details <FaArrowRight className="pl-1" />
                  </button>
                  <div className="flex space-x-2 items-center text-sm justify-between">
                    {" "}
                    <FaStar className="text-yellow" />{" "}
                    <p> ({courses.rating} Reviews)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <LandingFooter />
      </div>
    </div>
  );
};

export default HomePage;
