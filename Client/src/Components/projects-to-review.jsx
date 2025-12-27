import { MdEdit, MdVisibility } from "react-icons/md"
import { useNavigate } from "react-router-dom"

export function ProjectsToReview() {
  const navigate = useNavigate()

  const projects = [
    {
      id: 1,
      title: "Learning JavaScript with Web Development",
      learner: "Muhammad Ali",
      submittedDate: "2 days ago",
      priority: "High",
      course: "Web Development Fundamentals",
    },
    {
      id: 2,
      title: "The Complete ReactJS Project for Beginners",
      learner: "Fatima Khan",
      submittedDate: "5 days ago",
      priority: "Medium",
      course: "React Fundamentals",
    },
    {
      id: 3,
      title: "Learning JavaScript with Web Development",
      learner: "Hassan Ahmed",
      submittedDate: "1 week ago",
      priority: "Low",
      course: "JavaScript Basics",
    },
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Projects to Review</h2>
            <p className="text-sm text-gray-600">Review and provide feedback on learner projects</p>
          </div>
          <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="flex items-start gap-4 p-4 border rounded-lg">
            <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
              {project.learner
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold truncate">{project.title}</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600">By {project.learner}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">{project.course}</span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-500">Submitted {project.submittedDate}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/project-details/${project.id}`)}
                className="flex items-center gap-1 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                <MdVisibility className="h-4 w-4" />
                View
              </button>
              <button
                onClick={() => navigate(`/project-evaluation/${project.id}`)}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                <MdEdit className="h-4 w-4" />
                Evaluate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
