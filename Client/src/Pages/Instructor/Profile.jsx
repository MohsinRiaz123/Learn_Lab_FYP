import React, { useEffect, useState } from "react";

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        console.log("Fetching profile for ID:", userId); // debug
        const res = await fetch(
          `http://localhost:5000/api/users/${userId}`
        );

        if (!res.ok) {
          throw new Error(`Status ${res.status}`);
        }

        const data = await res.json();
        console.log("Profile data:", data); // debug
        setProfile(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  const show = (value) => value && value.trim() !== "" ? value : "N/A";

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-5xl mx-auto mt-6">
      <h2 className="text-lg font-bold text-gray-800 mb-6">My Profile</h2>
      <div className="space-y-4 text-gray-700 text-lg">
        <Row label="Registration Date" value={profile.createdAt?.slice(0, 10)} />
        <Row label="First Name" value={show(profile.firstName)} />
        <Row label="Last Name" value={show(profile.lastName)} />
        <Row label="Email" value={show(profile.email)} />
        <Row label="Phone Number" value={show(profile.phone)} />
        <Row label="Skill / Occupation" value={show(profile.occupation)} />
        <Row label="Biography" value={show(profile.bio)} />
      </div>
    </div>
  );
};

const Row = ({ label, value }) => (
  <div className="flex gap-2">
    <span className="font-medium w-80">{label}</span>
    <span>{value}</span>
  </div>
);

export default Profile;
