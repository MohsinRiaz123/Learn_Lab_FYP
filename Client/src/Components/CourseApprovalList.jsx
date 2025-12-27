import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Button } from "./Button"
import { Badge } from "./Badge"
import { Input } from "./Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./Table"

export function CourseApprovalList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Advanced React Development",
      instructor: "John Smith",
      status: "pending",
      students: 0,
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Machine Learning Basics",
      instructor: "Sarah Johnson",
      status: "approved",
      students: 45,
      date: "2024-01-10",
    },
    {
      id: 3,
      title: "Web Design Fundamentals",
      instructor: "Mike Wilson",
      status: "rejected",
      students: 0,
      date: "2024-01-12",
    },
    {
      id: 4,
      title: "Python for Beginners",
      instructor: "Emily Davis",
      status: "pending",
      students: 0,
      date: "2024-01-18",
    },
  ])

  const handleApprove = (id) => {
    setCourses(courses.map((course) => (course.id === id ? { ...course, status: "approved" } : course)))
    console.log(`Course ${id} approved`)
  }

  const handleReject = (id) => {
    setCourses(courses.map((course) => (course.id === id ? { ...course, status: "rejected" } : course)))
    console.log(`Course ${id} rejected`)
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
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
    <Card>
      <CardHeader>
        <CardTitle>Course Approval Queue</CardTitle>
        <div className="mt-4">
          <Input
            placeholder="Search courses or instructors..."
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
              <TableHead>Course Title</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{getStatusBadge(course.status)}</TableCell>
                <TableCell>{course.students}</TableCell>
                <TableCell>{course.date}</TableCell>
                <TableCell>
                  {course.status === "pending" && (
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleApprove(course.id)}>
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReject(course.id)}>
                        Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
