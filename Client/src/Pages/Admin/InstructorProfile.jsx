import React from "react"
import { useParams } from "react-router-dom"

export default function InstructorProfile() {
  const { id } = useParams()

  const dummyData = {
    name: "Dr. Ayesha Siddiqui",
    email: "ayesha@example.com",
    expertise: "Web Development",
    bio: "Senior instructor with 10+ years in teaching frontend frameworks.",
    joined: "January 2023",
  }

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Instructor Profile</h2>
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Name:</strong> {dummyData.name}</p>
      <p><strong>Email:</strong> {dummyData.email}</p>
      <p><strong>Expertise:</strong> {dummyData.expertise}</p>
      <p><strong>Bio:</strong> {dummyData.bio}</p>
      <p><strong>Joined:</strong> {dummyData.joined}</p>
    </div>
  )
}
