import { MdEdit, MdCheckCircle } from "react-icons/md"
import { ListItem } from "./list-item"

export function FeedbackList({ status }) {
  const getFeedback = (status) => {
    const allFeedback = [
      {
        id: 1,
        student: "Muhammad Ali",
        project: "E-commerce Website",
        course: "React Fundamentals",
        submittedDate: "2024-01-15",
        status: "pending",
      },
      {
        id: 2,
        student: "Fatima Khan",
        project: "Portfolio Website",
        course: "Web Development",
        submittedDate: "2024-01-14",
        status: "pending",
      },
      {
        id: 3,
        student: "Hassan Ahmed",
        project: "Weather App",
        course: "JavaScript Basics",
        submittedDate: "2024-01-10",
        status: "completed",
      },
    ]

    return allFeedback.filter((item) => item.status === status)
  }

  const feedback = getFeedback(status)

  const getActions = (item) => {
    if (status === "pending") {
      return [
        {
          label: "Provide Feedback",
          icon: MdEdit,
          className: "bg-indigo-600 text-white hover:bg-indigo-700",
          onClick: () => console.log("Provide Feedback", item.id),
        },
      ]
    } else {
      return [
        {
          label: "Completed",
          icon: MdCheckCircle,
          className: "bg-green-600 text-white",
          onClick: () => console.log("Completed", item.id),
        },
      ]
    }
  }

  return (
    <div className="space-y-4">
      {feedback.map((item) => (
        <ListItem
          key={item.id}
          title={item.project}
          metadata={[`Student: ${item.student}`, `Course: ${item.course}`, `Submitted: ${item.submittedDate}`]}
          actions={getActions(item)}
        />
      ))}
    </div>
  )
}
