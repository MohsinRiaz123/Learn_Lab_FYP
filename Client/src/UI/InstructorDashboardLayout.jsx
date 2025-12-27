import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { FaUser, FaBook, FaStar, FaClipboardList } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { IoStatsChartOutline } from "react-icons/io5";
import InstructorImage from "../assets/Images/instructor.png";
import profile from "../assets/Images/zoya.png";

const InstructorDashboardLayout = () => {
  const menu = [
    { name: "Dashboard", path: "/instructor", icon: <FaClipboardList /> },
    { name: "My Profile", path: "/instructor/profile", icon: <FaUser /> },
    // { name: "Assign Courses", path: "/instructor/courses", icon: <FaBook /> },
    { name: "Reviews", path: "/instructor/reviews", icon: <FaStar /> },
    {
      name: "Statistics",
      path: "/instructor/quizzes",
      icon: <IoStatsChartOutline />,
    },
    {
      name: "Create Course",
      path: "/instructor/createCourse",
      icon: <VscGitPullRequestCreate />,
    },
  ];
  const opration = [
    { name: "Setting", path: "/instructor/setting", icon: <IoSettingsSharp /> },
    { name: "Logout", path: "/", icon: <IoLogOut /> },
  ];

  const info = {
    name: "Zoya Bilal",
    rating: "5",
    reviews: "30",
    img: profile,
  };
  return (
    <div className="">
      {/* ----------------Header----------------------- */}
      <div className="bg-gradient-to-r from-blue to-purple text-white">
        <div className=" text-center pt-10">
          <h1 className="text-lg font-semibold">Web Developer</h1>
          <h2 className="text-4xl font-bold mt-1">Learn With {info.name}</h2>
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
                {info.rating}
                <span className="text-yellow-500 ">⭐</span> Rating | ({" "}
                {info.reviews} Reviews )
              </p>
            </div>
          </div>
          <div>
            <img src={InstructorImage} alt="Profile" className="" />
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
                end={item.path === "/instructor"}
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
                end={item.path === "/instructor"}
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

export default InstructorDashboardLayout;
