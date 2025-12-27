import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Setting = () => {
  const [profile, setProfile] = useState({
    registrationDate: "February 28, 2026 8:01 am",
    firstName: "Zoya",
    lastName: "Bilal",
    username: "instructor",
    email: "example@gmail.com",
    phone: "+1-202-555-0174",
    occupation: "Web Developer",
    bio: `I'm the Front-End Developer for #ThemeGenix in New York, OR. I have a serious passion for UI effects, animations, and creating intuitive, dynamic user experiences.`,
  });

  const [passwords, setPasswords] = useState({
    current: "mohgf",
    new: "",
    confirm: "",
  });

  const [socialLinks, setSocialLinks] = useState({
    twitter: "hgyhg@gmail.com",
    linkedin: "gfyswghjegmail.com",
    github: "mlcnkfgmail.com",
  });

  const [activeTab, setActiveTab] = useState("Personal Info");
  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };
  const handleChange = (setter, field, value) => {
    setter((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (activeTab === "Password") {
      if (passwords.new !== passwords.confirm) {
        toast.error("New password and Confirm password must match!");
        return;
      }
      if (!passwords.current || !passwords.new || !passwords.confirm) {
        toast.error("Please fill all password fields.");
        return;
      }
    }

    toast.success("Profile saved successfully!");
    console.log({ profile, passwords, socialLinks });
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Profile Image Upload */}
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full overflow-hidden border">
          <img
            src={
              profileImage ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Picture
          </label>

          <button
            type="button"
            onClick={() => document.getElementById("imageUpload").click()}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
          >
            Upload Image
          </button>

          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>
      {[
        { label: "First Name", field: "firstName", type: "text" },
        { label: "Last Name", field: "lastName", type: "text" },
        { label: "Phone Number", field: "phone", type: "text" },
        { label: "Skill/Occupation", field: "occupation", type: "text" },
      ].map(({ label, field, type }) => (
        <div key={field} className="flex flex-col">
          <label className="font-medium mb-1">{label}</label>
          <input
            type={type}
            value={profile[field]}
            onChange={(e) => handleChange(setProfile, field, e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
      ))}

      <div className="flex flex-col">
        <label className="font-medium mb-1">Biography</label>
        <textarea
          value={profile.bio}
          onChange={(e) => handleChange(setProfile, "bio", e.target.value)}
          rows={4}
          className="border rounded px-3 py-2"
        />
      </div>
    </div>
  );

  const renderPassword = () => (
    <div className="space-y-6">
      {[
        { label: "Current Password", field: "current" },
        { label: "New Password", field: "new" },
        { label: "Confirm New Password", field: "confirm" },
      ].map(({ label, field }) => (
        <div key={field} className="flex flex-col relative">
          <label className="font-medium mb-1">{label}</label>
          <input
            type={passwordVisibility[field] ? "text" : "password"}
            value={passwords[field]}
            onChange={(e) => handleChange(setPasswords, field, e.target.value)}
            className={`border rounded px-3 py-2 pr-10 ${
              field === "confirm" &&
              passwords.confirm &&
              passwords.new !== passwords.confirm
                ? "border-red-500"
                : ""
            }`}
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility(field)}
            className="absolute right-3 top-[38px] text-gray-500"
          >
            {passwordVisibility[field] ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      ))}
    </div>
  );

  const renderSocialLinks = () => (
    <div className="space-y-6">
      {[
        { label: "Twitter", field: "twitter" },
        { label: "LinkedIn", field: "linkedin" },
        { label: "GitHub", field: "github" },
      ].map(({ label, field }) => (
        <div key={field} className="flex flex-col">
          <label className="font-medium mb-1">{label}</label>
          <input
            type="text"
            value={socialLinks[field]}
            onChange={(e) =>
              handleChange(setSocialLinks, field, e.target.value)
            }
            className="border rounded px-3 py-2"
            placeholder={`Enter your ${label}`}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto mt-6">
      <ToastContainer position="top-center" />
      <h2 className="text-xl font-bold text-gray-800 mb-6">My Profile</h2>

      {/* Tabs */}
      <div className="flex space-x-6 mb-6">
        {["Personal Info", "Password", "Social Links"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-medium ${
              activeTab === tab
                ? "border-b-4 border-purple text-purple"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="text-gray-700">
        {activeTab === "Personal Info" && renderPersonalInfo()}
        {activeTab === "Password" && renderPassword()}
        {activeTab === "Social Links" && renderSocialLinks()}
      </div>

      {/* Save Button */}
      <div className="pt-6 text-right">
        <button
          onClick={handleSave}
          className="bg-purple hover:bg-blue-800 text-white px-6 py-2 rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Setting;
