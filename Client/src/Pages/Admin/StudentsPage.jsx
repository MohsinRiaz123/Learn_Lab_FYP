import { StudentManagement } from "../../components/StudentManagement"
import React from 'react'

const StudentsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
        <p className="text-gray-600">Manage student accounts and enrollments</p>
      </div>

      <StudentManagement />
    </div>
  )
}

export default StudentsPage

