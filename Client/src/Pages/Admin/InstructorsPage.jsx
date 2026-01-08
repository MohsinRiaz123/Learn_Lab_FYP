import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import { Input } from "../../components/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/Table";

const InstructorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingIds, setUpdatingIds] = useState([]); // Track IDs being updated

  // Fetch instructors from API
  const fetchInstructors = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/users/instructors");
      if (!res.ok) throw new Error("Failed to fetch instructors");
      const data = await res.json();
      setInstructors(data);
    } catch (err) {
      console.error("Error fetching instructors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  // Approve instructor
  const handleApprove = async (id) => {
    setUpdatingIds((prev) => [...prev, id]);
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/instructors/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "active" }),
        }
      );
      if (!res.ok) throw new Error("Failed to approve instructor");
      const updatedInstructor = await res.json();
      setInstructors((prev) =>
        prev.map((inst) => (inst._id === id ? updatedInstructor : inst))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingIds((prev) => prev.filter((updId) => updId !== id));
    }
  };

  // Suspend instructor
  const handleSuspend = async (id) => {
    setUpdatingIds((prev) => [...prev, id]);
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/instructors/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "inactive" }),
        }
      );
      if (!res.ok) throw new Error("Failed to suspend instructor");
      const updatedInstructor = await res.json();
      setInstructors((prev) =>
        prev.map((inst) => (inst._id === id ? updatedInstructor : inst))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingIds((prev) => prev.filter((updId) => updId !== id));
    }
  };

  // Download uploaded resume
  const handleDownloadResume = async (id, name) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/instructors/${id}/resume`
      );
      if (!res.ok) throw new Error("Failed to download resume");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${name.replace(" ", "_")}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  // Filter instructors by search
  const filteredInstructors = instructors.filter(
    (inst) =>
      inst.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status badge mapping
  const getStatusBadge = (status) => {
    const variants = {
      inactive: "warning",
      active: "success",
    };
    const labels = {
      inactive: "Inactive",
      active: "Approved",
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

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
          {loading ? (
            <p>Loading instructors...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Resume</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredInstructors.map((inst) => (
                  <TableRow key={inst._id}>
                    <TableCell className="font-medium">
                      {inst.firstName} {inst.lastName}
                    </TableCell>
                    <TableCell>{inst.email}</TableCell>
                    <TableCell>{getStatusBadge(inst.status)}</TableCell>
                    <TableCell>
                      {inst.resume ? (
                        <Button
                          size="sm"
                          onClick={() =>
                            handleDownloadResume(
                              inst._id,
                              `${inst.firstName} ${inst.lastName}`
                            )
                          }
                        >
                          Download Resume
                        </Button>
                      ) : (
                        <span>No Resume</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(inst.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {inst.status === "inactive" && (
                        <Button
                          size="sm"
                          onClick={() => handleApprove(inst._id)}
                          disabled={updatingIds.includes(inst._id)}
                        >
                          {updatingIds.includes(inst._id) ? "Approving..." : "Approve"}
                        </Button>
                      )}
                      {inst.status === "active" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleSuspend(inst._id)}
                          disabled={updatingIds.includes(inst._id)}
                        >
                          {updatingIds.includes(inst._id) ? "Suspending..." : "Suspend"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorsPage;
