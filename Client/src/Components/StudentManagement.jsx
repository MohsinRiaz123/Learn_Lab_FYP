import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Button } from "./Button"
import { Badge } from "./Badge"
import { Input } from "./Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./Table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./Dialog"

export function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [students, setStudents] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "active", courses: 3, joinDate: "2024-01-15" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", status: "inactive", courses: 1, joinDate: "2024-01-10" },
    { id: 3, name: "Carol Wilson", email: "carol@example.com", status: "active", courses: 5, joinDate: "2024-01-12" },
    { id: 4, name: "David Brown", email: "david@example.com", status: "suspended", courses: 2, joinDate: "2024-01-18" },
  ])

  const handleViewStudent = (student) => {
    setSelectedStudent(student)
    setIsDialogOpen(true)
  }

  const handleStatusChange = (id, newStatus) => {
    setStudents(students.map((student) => (student.id === id ? { ...student, status: newStatus } : student)))
    console.log(`Student ${id} status changed to ${newStatus}`)
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status) => {
    const variants = {
      active: "success",
      inactive: "default",
      suspended: "error",
    }
    return <Badge variant={variants[status]}>{status}</Badge>
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <div className="mt-4">
            <Input
              placeholder="Search students..."
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
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell>{student.courses}</TableCell>
                  <TableCell>{student.joinDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewStudent(student)}>
                        View
                      </Button>
                      {student.status === "active" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStatusChange(student.id, "suspended")}
                        >
                          Suspend
                        </Button>
                      )}
                      {student.status === "suspended" && (
                        <Button size="sm" onClick={() => handleStatusChange(student.id, "active")}>
                          Activate
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div>
                <strong>Name:</strong> {selectedStudent.name}
              </div>
              <div>
                <strong>Email:</strong> {selectedStudent.email}
              </div>
              <div>
                <strong>Status:</strong> {getStatusBadge(selectedStudent.status)}
              </div>
              <div>
                <strong>Enrolled Courses:</strong> {selectedStudent.courses}
              </div>
              <div>
                <strong>Join Date:</strong> {selectedStudent.joinDate}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
