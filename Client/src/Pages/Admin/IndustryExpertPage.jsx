import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/Card";
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

const IndustryExpertPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingIds, setUpdatingIds] = useState([]); // track approve/suspend actions
  const [showModal, setShowModal] = useState(false); // for Add Expert popup
  const [newExpert, setNewExpert] = useState({
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    password: "",
  });

  const [adding, setAdding] = useState(false); // block Add Expert button

  // Fetch experts from API
  const fetchExperts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/users/experts");
      if (!res.ok) throw new Error("Failed to fetch experts");
      const data = await res.json();
      setExperts(data);
      console.log("Fetched experts:", data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  // Approve / Activate
  const handleApprove = async (id) => {
    setUpdatingIds((prev) => [...prev, id]);
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/experts/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "active" }),
        }
      );
      if (!res.ok) throw new Error("Failed to approve expert");
      const updatedExpert = await res.json();
      setExperts((prev) =>
        prev.map((exp) => (exp._id === id ? updatedExpert : exp))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingIds((prev) => prev.filter((updId) => updId !== id));
    }
  };

  // Suspend / Inactivate
  const handleSuspend = async (id) => {
    setUpdatingIds((prev) => [...prev, id]);
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/experts/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "inactive" }),
        }
      );
      if (!res.ok) throw new Error("Failed to suspend expert");
      const updatedExpert = await res.json();
      setExperts((prev) =>
        prev.map((exp) => (exp._id === id ? updatedExpert : exp))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingIds((prev) => prev.filter((updId) => updId !== id));
    }
  };

  // Add new expert
  const handleAddExpert = async () => {
    const { firstName, lastName, email, occupation, password } = newExpert;

    if (!firstName || !lastName || !email || !occupation || !password) {
      alert("All fields are required");
      return;
    }

    setAdding(true);
    try {
      const res = await fetch("http://localhost:5000/api/users/experts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpert),
      });

      if (!res.ok) throw new Error("Failed to add expert");

      const addedExpert = await res.json();
      setExperts((prev) => [addedExpert, ...prev]);

      setNewExpert({
        firstName: "",
        lastName: "",
        email: "",
        occupation: "",
        password: "",
      });
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add expert");
    } finally {
      setAdding(false);
    }
  };

  // Filter experts safely
  const filteredExperts = experts.filter(
    (exp) =>
      (exp.name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
      (exp.email?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
      (exp.expertise?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
  );

  // Status badge
  const getStatusBadge = (status) => {
    const variants = {
      active: "success",
      inactive: "warning",
    };
    const labels = {
      active: "active",
      inactive: "inactive",
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Industry Expert Management
          </h1>
          <p className="text-gray-600">
            Manage industry expert applications and profiles
          </p>
        </div>

        <Button onClick={() => setShowModal(true)}>+ Add New Expert</Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Industry Experts</CardTitle>
          <Input
            placeholder="Search experts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm mt-4"
          />
        </CardHeader>

        <CardContent>
          {loading ? (
            <p>Loading experts...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Expertise</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredExperts.map((exp) => (
                  <TableRow key={exp._id}>
                    <TableCell className="font-medium">
                      {exp.firstName} {exp.lastName}
                    </TableCell>
                    <TableCell>{exp.email}</TableCell>
                    <TableCell>{exp.occupation}</TableCell>
                    <TableCell>{getStatusBadge(exp.status)}</TableCell>
                    <TableCell>
                      {new Date(exp.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {exp.status === "inactive" && (
                        <Button
                          size="sm"
                          onClick={() => handleApprove(exp._id)}
                          disabled={updatingIds.includes(exp._id)}
                        >
                          {updatingIds.includes(exp._id)
                            ? "Activating..."
                            : "Approve"}
                        </Button>
                      )}

                      {exp.status === "active" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleSuspend(exp._id)}
                          disabled={updatingIds.includes(exp._id)}
                        >
                          {updatingIds.includes(exp._id)
                            ? "Suspending..."
                            : "Suspend"}
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

      {/* Add Expert Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">Add New Expert</h2>
            <Input
              placeholder="First Name"
              value={newExpert.firstName}
              onChange={(e) =>
                setNewExpert({ ...newExpert, firstName: e.target.value })
              }
            />

            <Input
              placeholder="Last Name"
              value={newExpert.lastName}
              onChange={(e) =>
                setNewExpert({ ...newExpert, lastName: e.target.value })
              }
            />

            <Input
              placeholder="Email"
              value={newExpert.email}
              onChange={(e) =>
                setNewExpert({ ...newExpert, email: e.target.value })
              }
            />

            <Input
              placeholder="Expertise"
              value={newExpert.occupation}
              onChange={(e) =>
                setNewExpert({ ...newExpert, occupation: e.target.value })
              }
            />

            <Input
              type="password"
              placeholder="Password"
              value={newExpert.password}
              onChange={(e) =>
                setNewExpert({ ...newExpert, password: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddExpert} disabled={adding}>
                {adding ? "Adding..." : "Add Expert"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustryExpertPage;
