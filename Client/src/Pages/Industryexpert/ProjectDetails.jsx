import React from "react"
import { useParams } from "react-router-dom"

export default function ProjectDetails() {
  const { id } = useParams()

  const dummyProject = {
    title: "Sample Project Title",
    learner: "Hassan Ahmed",
    course: "JavaScript Basics",
    description:
      "This is a description of a learner's project. It involves creating a task management app using vanilla JavaScript, HTML, and CSS.",
    submitted: "1 week ago",
  }

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Project Details</h2>
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Title:</strong> {dummyProject.title}</p>
      <p><strong>Learner:</strong> {dummyProject.learner}</p>
      <p><strong>Course:</strong> {dummyProject.course}</p>
      <p><strong>Submitted:</strong> {dummyProject.submitted}</p>
      <p className="mt-2"><strong>Description:</strong> {dummyProject.description}</p>
    </div>
  )
}
