import React, { useState } from "react";
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
  const [showModal, setShowModal] = useState(false);

  const [experts, setExperts] = useState([
    {
      id: 1,
      name: "Ali Khan",
      email: "ali.khan@industry.com",
      expertise: "Software Architecture",
      status: "pending",
      experience: "8 Years",
      joinDate: "2024-02-01",
    },
    {
      id: 2,
      name: "Fatima Noor",
      email: "fatima@industry.com",
      expertise: "Data Science",
      status: "approved",
      experience: "6 Years",
      joinDate: "2024-01-22",
    },
    {
      id: 3,
      name: "Usman Tariq",
      email: "usman@industry.com",
      expertise: "Cloud Computing",
      status: "inactive",
      experience: "10 Years",
      joinDate: "2024-01-10",
    },
  ]);

  // New expert form
  const [newExpert, setNewExpert] = useState({
    name: "",
    email: "",
    expertise: "",
    experience: "",
  });

  // Add expert
  const handleAddExpert = () => {
    if (
      !newExpert.name ||
      !newExpert.email ||
      !newExpert.expertise ||
      !newExpert.experience
    ) {
      alert("All fields are required");
      return;
    }

    setExperts([
      ...experts,
      {
        id: Date.now(),
        ...newExpert,
        status: "pending",
        joinDate: new Date().toISOString().split("T")[0],
      },
    ]);

    setNewExpert({ name: "", email: "", expertise: "", experience: "" });
    setShowModal(false);
  };

  // Approve
  const handleApprove = (id) => {
    setExperts(
      experts.map((expert) =>
        expert.id === id ? { ...expert, status: "approved" } : expert
      )
    );
  };

  // Reject
  const handleReject = (id) => {
    setExperts(
      experts.map((expert) =>
        expert.id === id ? { ...expert, status: "rejected" } : expert
      )
    );
  };

  // Toggle Active / Inactive
  const toggleActiveStatus = (id) => {
    setExperts(
      experts.map((expert) =>
        expert.id === id
          ? {
              ...expert,
              status:
                expert.status === "approved" ? "inactive" : "approved",
            }
          : expert
      )
    );
  };

  // Delete
  const handleDelete = (id) => {
    if (!window.confirm("Delete this expert?")) return;
    setExperts(experts.filter((expert) => expert.id !== id));
  };

  // Filter
  const filteredExperts = experts.filter(
    (expert) =>
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.expertise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Badge
  const getStatusBadge = (status) => {
    const variants = {
      pending: "warning",
      approved: "success",
      rejected: "error",
      inactive: "secondary",
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Expertise</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredExperts.map((expert) => (
                <TableRow key={expert.id}>
                  <TableCell className="font-medium">{expert.name}</TableCell>
                  <TableCell>{expert.email}</TableCell>
                  <TableCell>{expert.expertise}</TableCell>
                  <TableCell>{getStatusBadge(expert.status)}</TableCell>
                  <TableCell>{expert.experience}</TableCell>
                  <TableCell>{expert.joinDate}</TableCell>

                  <TableCell>
                    {expert.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleApprove(expert.id)}>
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(expert.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}

                    {expert.status === "approved" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleActiveStatus(expert.id)}
                        >
                          Active
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(expert.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}

                    {expert.status === "inactive" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleActiveStatus(expert.id)}
                        >
                          Activate
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(expert.id)}
                        >
                          Delete
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

      {/* Add Expert Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">Add New Expert</h2>

            <Input
              placeholder="Full Name"
              value={newExpert.name}
              onChange={(e) =>
                setNewExpert({ ...newExpert, name: e.target.value })
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
              value={newExpert.expertise}
              onChange={(e) =>
                setNewExpert({ ...newExpert, expertise: e.target.value })
              }
            />
            <Input
              placeholder="Experience (e.g. 5 Years)"
              value={newExpert.experience}
              onChange={(e) =>
                setNewExpert({ ...newExpert, experience: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddExpert}>Add Expert</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustryExpertPage;
