import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export function CourseApprovalList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({}); // track which course is updating
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // 🔹 Handle Approve / Reject
  const updateStatus = async (id, status) => {
    setUpdating((prev) => ({ ...prev, [id]: status })); // mark course updating

    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const updated = await res.json();
      setCourses((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setUpdating((prev) => ({ ...prev, [id]: null })); // remove loading
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const variants = {
      pending: "warning",
      active: "success",
      rejected: "error",
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  if (loading)
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          Loading courses...
        </CardContent>
      </Card>
    );

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
              <TableHead>Date</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course._id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{getStatusBadge(course.status)}</TableCell>
                <TableCell>
                  {new Date(course.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/admin/courses/${course._id}`)}
                  >
                    View Details
                  </Button>
                </TableCell>
                <TableCell className="flex space-x-2">
                  {course.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => updateStatus(course._id, "active")}
                        disabled={updating[course._id] === "active"}
                      >
                        {updating[course._id] === "active"
                          ? "Approving..."
                          : "Approve"}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateStatus(course._id, "rejected")}
                        disabled={updating[course._id] === "rejected"}
                      >
                        {updating[course._id] === "rejected"
                          ? "Rejecting..."
                          : "Reject"}
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
