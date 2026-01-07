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
import { useEffect, useState } from "react";

const InstructorDashboardLayout = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Instructor",
    img: profile,
  });
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

const localUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUserData = async () => {
      if (!localUser?.id) return;

      try {
        const res = await fetch(`http://localhost:5000/api/users/${localUser.id}`);
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();

        setUserInfo({
          name: `${data.firstName || "N/A"} ${data.lastName || "N/A"}`,
          img: data.profileImage || profile, // fallback to default profile
        });
      } catch (err) {
        console.error("Error fetching user:", err);
        setUserInfo({
          name: `${localUser.firstName || "N/A"} ${localUser.lastName || "N/A"}`,
          img: profile,
        });
      }
    };

    fetchUserData();
  }, [  ]);
  return (
    <div className="">
      {/* ----------------Header----------------------- */}
      <div className="bg-gradient-to-r from-blue to-purple text-white">
        <div className=" text-center pt-10">
          <h2 className="text-4xl font-bold mt-1">Learn With {userInfo.name}</h2>
        </div>
        <div className="flex justify-around">
          <div className="   flex items-center ">
            <div>
              <img
                src={userInfo.img}
                alt="Profile"
                className="rounded-full w-28 h-28 border-2 border-white m-4"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold ">{userInfo.name}</h2>
             
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
            Welcome, {userInfo.name}
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
                      onClick={() => {
        if (item.name === "Logout") {
          localStorage.clear(); // clear all local storage
        }
      }}
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
