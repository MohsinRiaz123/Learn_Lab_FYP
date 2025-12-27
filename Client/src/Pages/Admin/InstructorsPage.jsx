import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card"
import { Button } from "../../components/Button"
import { Badge } from "../../components/Badge"
import { Input } from "../../components/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/Table"
import React from 'react'

const InstructorsPage = () => {
   const [searchTerm, setSearchTerm] = useState("")
  const [instructors, setInstructors] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      status: "approved",
      courses: 3,
      rating: 4.8,
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      status: "pending",
      courses: 0,
      rating: 0,
      joinDate: "2024-01-20",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@example.com",
      status: "approved",
      courses: 5,
      rating: 4.6,
      joinDate: "2024-01-12",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      status: "rejected",
      courses: 0,
      rating: 0,
      joinDate: "2024-01-18",
    },
  ])

  const handleApprove = (id) => {
    setInstructors(
      instructors.map((instructor) => (instructor.id === id ? { ...instructor, status: "approved" } : instructor)),
    )
    console.log(`Instructor ${id} approved`)
  }

  const handleReject = (id) => {
    setInstructors(
      instructors.map((instructor) => (instructor.id === id ? { ...instructor, status: "rejected" } : instructor)),
    )
    console.log(`Instructor ${id} rejected`)
  }

  const filteredInstructors = instructors.filter(
    (instructor) =>
      instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status) => {
    const variants = {
      pending: "warning",
      approved: "success",
      rejected: "error",
    }
    return <Badge variant={variants[status]}>{status}</Badge>
  }
  return (
     <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Instructor Management</h1>
        <p className="text-gray-600">Manage instructor applications and accounts</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Instructor Applications</CardTitle>
          <div className="mt-4">
            <Input
              placeholder="Search instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInstructors.map((instructor) => (
                <TableRow key={instructor.id}>
                  <TableCell className="font-medium">{instructor.name}</TableCell>
                  <TableCell>{instructor.email}</TableCell>
                  <TableCell>{getStatusBadge(instructor.status)}</TableCell>
                  <TableCell>{instructor.courses}</TableCell>
                  <TableCell>{instructor.rating > 0 ? `⭐ ${instructor.rating}` : "N/A"}</TableCell>
                  <TableCell>{instructor.joinDate}</TableCell>
                  <TableCell>
                    {instructor.status === "pending" && (
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleApprove(instructor.id)}>
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleReject(instructor.id)}>
                          Reject
                        </Button>
                      </div>
                    )}
                    {instructor.status === "approved" && (
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default InstructorsPage

