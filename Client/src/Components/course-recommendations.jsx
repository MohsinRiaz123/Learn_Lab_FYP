import { MdBook, MdEdit } from "react-icons/md"

export function CourseRecommendations() {
  const courses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      recommendations: 3,
    },
    {
      id: 2,
      title: "React Fundamentals",
      recommendations: 2,
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Course Recommendations</h2>
            <p className="text-sm text-gray-600">Suggest improvements to courses</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-full">
                <MdBook className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-medium">{course.title}</h4>
                <p className="text-xs text-gray-500">{course.recommendations} pending recommendations</p>
              </div>
            </div>
            <button className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800">
              <MdEdit className="h-4 w-4" />
              Edit
            </button>
          </div>
        ))}
      </div>
      <div className="p-6 border-t">
        <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          Add New Recommendation
        </button>
      </div>
    </div>
  )
}
