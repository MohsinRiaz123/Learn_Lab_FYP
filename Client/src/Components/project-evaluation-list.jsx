import { MdEdit, MdVisibility, MdCheckCircle } from "react-icons/md"
import { ListItem } from "./list-item"

export function ProjectEvaluationList({ status }) {
  const getProjects = (status) => {
    const allProjects = [
      {
        id: 1,
        title: "E-commerce Website with React",
        learner: "Muhammad Ali",
        course: "React Fundamentals",
        submittedDate: "2024-01-15",
        priority: "High",
        status: "pending",
      },
      {
        id: 2,
        title: "Portfolio Website",
        learner: "Fatima Khan",
        course: "Web Development",
        submittedDate: "2024-01-14",
        priority: "Medium",
        status: "pending",
      },
      {
        id: 3,
        title: "Task Management App",
        learner: "Hassan Ahmed",
        course: "JavaScript Basics",
        submittedDate: "2024-01-13",
        priority: "Low",
        status: "inProgress",
      },
      {
        id: 4,
        title: "Weather App",
        learner: "Ayesha Malik",
        course: "React Fundamentals",
        submittedDate: "2024-01-10",
        priority: "High",
        status: "completed",
      },
    ]

    return allProjects.filter((project) => project.status === status)
  }

  const projects = getProjects(status)

  const getActions = (project) => {
    const actions = [
      {
        label: "View",
        icon: MdVisibility,
        onClick: () => console.log("View", project.id),
      },
    ]

    if (status === "pending") {
      actions.push({
        label: "Start Review",
        icon: MdEdit,
        className: "bg-indigo-600 text-white hover:bg-indigo-700",
        onClick: () => console.log("Start Review", project.id),
      })
    } else if (status === "completed") {
      actions.push({
        label: "Completed",
        icon: MdCheckCircle,
        className: "bg-green-600 text-white",
        onClick: () => console.log("Completed", project.id),
      })
    }

    return actions
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ListItem
          key={project.id}
          title={project.title}
          priority={project.priority}
          metadata={[`Student: ${project.learner}`, `Course: ${project.course}`, `Submitted: ${project.submittedDate}`]}
          actions={getActions(project)}
        />
      ))}
    </div>
  )
}
