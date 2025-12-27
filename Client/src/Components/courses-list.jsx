import { MdBook, MdPeople } from "react-icons/md"

export function CoursesList() {
  const courses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      students: 25,
      progress: 75,
      status: "Active",
    },
    {
      id: 2,
      title: "React Fundamentals",
      students: 18,
      progress: 60,
      status: "Active",
    },
    {
      id: 3,
      title: "JavaScript Basics",
      students: 30,
      progress: 90,
      status: "Active",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <div key={course.id} className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <MdBook className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">{course.status}</span>
          </div>

          <h3 className="font-semibold text-lg mb-2">{course.title}</h3>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <MdPeople className="h-4 w-4" />
            <span>{course.students} students</span>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
            </div>
          </div>

          <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            View Details
          </button>
        </div>
      ))}
    </div>
  )
}
