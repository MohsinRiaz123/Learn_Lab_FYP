import { useState } from "react"

export function CourseRecommendationForm() {
  const [formData, setFormData] = useState({
    course: "",
    title: "",
    description: "",
    priority: "",
    justification: "",
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({
      course: "",
      title: "",
      description: "",
      priority: "",
      justification: "",
    })
  }

  const courses = [
    { id: 1, name: "Web Development Fundamentals" },
    { id: 2, name: "React Fundamentals" },
    { id: 3, name: "JavaScript Basics" },
    { id: 4, name: "Database Fundamentals" },
    { id: 5, name: "UI/UX Design" },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
            Course
          </label>
          <select
            id="course"
            value={formData.course}
            onChange={(e) => handleChange("course", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Recommendation Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="E.g., Add section on modern CSS frameworks"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Detailed Description
          </label>
          <textarea
            id="description"
            placeholder="Describe your recommendation in detail..."
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="priority"
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label htmlFor="justification" className="block text-sm font-medium text-gray-700 mb-1">
            Industry Justification
          </label>
          <textarea
            id="justification"
            placeholder="Explain why this change is important based on industry trends..."
            rows={4}
            value={formData.justification}
            onChange={(e) => handleChange("justification", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Submit Recommendation
        </button>
      </div>
    </form>
  )
}
