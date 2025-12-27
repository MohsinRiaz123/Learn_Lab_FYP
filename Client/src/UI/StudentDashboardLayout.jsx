import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaUser, FaBook, FaStar, FaClipboardList } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import StudentImage from "../assets/Images/students.png";
import profile from "../assets/Images/haider.png";
import { MdGroups } from "react-icons/md";
const StudentDashboardLayout = () => {
  const menu = [
    { name: "Dashboard", path: "/student", icon: <FaClipboardList /> },
    { name: "My Profile", path: "/student/profile", icon: <FaUser /> },
    { name: "Enrolled Courses", path: "/student/courses", icon: <FaBook /> },
    { name: "Reviews", path: "/student/reviews", icon: <FaStar /> },
  
    {
      name: "My Quiz Attempts",
      path: "/student/quizzes",
      icon: <FaClipboardList />,
    },
  { name: "Mentors", path: "/student/mentors", icon: <MdGroups  /> }
  ];
  const opration = [
    { name: "Setting", path: "/student/setting", icon: <  IoSettingsSharp /> },
    { name: "Logout", path: "/", icon: <IoLogOut /> },
  ];

  const info = {
    name: "Mohsin Riaz",
    enrolled: "5",
    certificate: "3",
    img: profile,
  };
  return (
    <div className="">
      {/* ----------------Header----------------------- */}
      <div className="bg-gradient-to-r from-blue to-purple text-white">
        <div className=" text-center pt-10">
          <h1 className="text-lg font-semibold">
            Looking Forward Build New Skill
          </h1>
          <h2 className="text-4xl font-bold mt-1">{info.name}</h2>
        </div>
        <div className="flex justify-around">
          <div className="   flex items-center ">
            <div>
              <img
                src={info.img}
                alt="Profile"
                className="rounded-full w-28 h-28 border-2 border-white m-4"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold ">{info.name}</h2>
              <p className="mt-1 text-sm">
                 {info.enrolled} Courses Enrolled |  {info.certificate}{" "}
                Certificate
              </p>
            </div>
          </div>
          <div>
            <img src={StudentImage} alt="Profile" className="" />
          </div>
        </div>
      </div>
      {/* ------------------------Sidebar------------------- */}
      <div className="flex">
        <div className=" w-64 bg-white p-4">
          <h2 className="text-lg text-gray-500 font-semibold mb-6">
            Welcome, {info.name}
          </h2>
          <nav className="space-y-3">
            {menu.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                end={item.path === "/student"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md  transition ${
                    isActive
                      ? "bg-purple text-white"
                      : "text-gray-700 hover:text-purple"
                  }`
                }
              >
                {item.icon} {item.name}
              </NavLink>
            ))}
          </nav>
          <h2 className="text-lg font-semibold text-gray-500 my-6">User</h2>
          <nav className="space-y-3">
            {opration.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                end={item.path === "/student"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md  transition ${
                    isActive
                      ? "bg-purple text-white"
                      : "text-gray-700 hover:text-purple"
                  }`
                }
              >
                {item.icon} {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
