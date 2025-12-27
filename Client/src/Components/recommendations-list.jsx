import { MdEdit, MdVisibility } from "react-icons/md"
import { ListItem } from "./list-item"

export function RecommendationsList() {
  const recommendations = [
    {
      id: 1,
      title: "Add Modern CSS Frameworks Section",
      course: "Web Development Fundamentals",
      priority: "High",
      status: "Pending Review",
      submittedDate: "2024-01-15",
      description:
        "Include comprehensive coverage of modern CSS frameworks like Tailwind CSS and Bootstrap to keep students updated with current industry practices.",
    },
    {
      id: 2,
      title: "Include React Hooks Best Practices",
      course: "React Fundamentals",
      priority: "Medium",
      status: "Approved",
      submittedDate: "2024-01-10",
      description:
        "Add detailed section on React Hooks patterns, custom hooks, and performance optimization techniques.",
    },
    {
      id: 3,
      title: "Database Security Module",
      course: "Database Fundamentals",
      priority: "High",
      status: "Under Review",
      submittedDate: "2024-01-08",
      description:
        "Include comprehensive database security practices, SQL injection prevention, and data encryption methods.",
    },
    {
      id: 4,
      title: "API Testing with Postman",
      course: "Web Development Fundamentals",
      priority: "Low",
      status: "Rejected",
      submittedDate: "2024-01-05",
      description: "Add practical exercises for API testing using Postman and automated testing tools.",
    },
  ]

  return (
    <div className="space-y-4">
      {recommendations.map((rec) => (
        <ListItem
          key={rec.id}
          title={rec.title}
          subtitle={rec.description}
          priority={rec.priority}
          status={rec.status}
          metadata={[`Course: ${rec.course}`, `Submitted: ${rec.submittedDate}`]}
          actions={[
            {
              label: "View",
              icon: MdVisibility,
              onClick: () => console.log("View", rec.id),
            },
            ...(rec.status !== "Approved" && rec.status !== "Rejected"
              ? [
                  {
                    label: "Edit",
                    icon: MdEdit,
                    onClick: () => console.log("Edit", rec.id),
                  },
                ]
              : []),
          ]}
        />
      ))}

      {recommendations.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No recommendations found.</p>
        </div>
      )}
    </div>
  )
}
