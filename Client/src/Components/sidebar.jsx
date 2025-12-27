import { Link, useLocation } from "react-router-dom"
import { MdDashboard, MdBook, MdAssignment, MdMessage, MdSettings, MdLogout, MdPerson, MdEdit } from "react-icons/md"
import { useNavigate } from "react-router-dom";
export function Sidebar() {
  const location = useLocation()
 const navigate = useNavigate();

  const handleLogout = () => {
    // Optionally clear auth tokens here
    navigate("/"); // Navigate to main page
  };
  const menuItems = [
    { href: "/industoryExpert", label: "Dashboard", icon: MdDashboard },
    { href: "/industoryExpert/profile", label: "My Profile", icon: MdPerson },
    { href: "/industoryExpert/projects", label: "Project Evaluations", icon: MdAssignment },
    { href: "/industoryExpert/feedback", label: "Learner Feedback", icon: MdEdit },
    { href: "/industoryExpert/courses", label: "Courses", icon: MdBook },
    { href: "/industoryExpert/messages", label: "Messages", icon: MdMessage },
    { href: "/industoryExpert/recommendations", label: "Recommendations", icon: MdEdit },
    { href: "/industoryExpert/settings", label: "Settings", icon: MdSettings },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-indigo-600">LearnLab</h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-indigo-50 ${
                  location.pathname === item.href
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                <item.icon className="h-5 w-5 text-indigo-600" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <button className="w-full flex items-center justify-start gap-2 px-3 py-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <MdLogout className="h-5 w-5" />
          <span  onClick={handleLogout}>Log Out</span>
        </button>
      </div>
    </div>
  )
}
