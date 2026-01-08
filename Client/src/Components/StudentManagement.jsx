import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { Input } from "./Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

export function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null); // track which student is being updated

  // ===============================
  // FETCH STUDENTS ON PAGE LOAD
  // ===============================
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/students");
        if (!res.ok) throw new Error("Failed to fetch students");

        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // ===============================
  // UPDATE STUDENT STATUS
  // ===============================
  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id); // disable button

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/students/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) throw new Error("Status update failed");

      const updatedStudent = await res.json();

      setStudents((prev) =>
        prev.map((student) =>
          student._id === updatedStudent._id
            ? { ...student, status: updatedStudent.status }
            : student
        )
      );
    } catch (error) {
      console.error("Error updating student status:", error);
    } finally {
      setUpdatingId(null); // re-enable button
    }
  };

  // ===============================
  // FILTER STUDENTS
  // ===============================
  const filteredStudents = students.filter(
    (student) =>
      `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===============================
  // STATUS BADGE
  // ===============================
  const getStatusBadge = (status) => {
    const variants = {
      active: "success",
      inactive: "error",
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  // ===============================
  // LOADING UI
  // ===============================
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-gray-600 animate-pulse">Loading students...</p>
      </div>
    );
  }

  return (
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
              <TableHead>Join Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student._id}>
                  <TableCell className="font-medium">
                    {student.firstName} {student.lastName}
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell>
                    {new Date(student.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {student.status === "active" ? (
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={updatingId === student._id}
                        onClick={() =>
                          handleStatusChange(student._id, "inactive")
                        }
                      >
                        {updatingId === student._id ? "Updating..." : "Suspend"}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        disabled={updatingId === student._id}
                        onClick={() =>
                          handleStatusChange(student._id, "active")
                        }
                      >
                        {updatingId === student._id ? "Updating..." : "Activate"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center text-gray-500">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
