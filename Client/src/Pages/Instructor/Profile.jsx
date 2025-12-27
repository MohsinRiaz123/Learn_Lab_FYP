import React from "react";

const Profile = () => {
  const profile = {
    registrationDate: "February 28, 2026 8:01 am",
    firstName: "Zoya",
    lastName: "Bilal",
    email: "example@gmail.com",
    phone: "+1-202-555-0174",
    occupation: "Web Developer",
    bio: `I'm the Front-End Developer for #ThemeGenix in New York, OR. I have a serious passion for UI effects, animations, and creating intuitive, dynamic user experiences.`,
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-5xl mx-auto mt-6">
      <h2 className="text-lg font-bold text-gray-800 mb-6">My Profile</h2>
      <div className=" space-y-4  text-gray-700 text-lg">
        <div className="flex gap-2">
          <span className="font-medium w-80">Registration Date</span>
          <span>{profile.registrationDate}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium w-80">First Name</span>
          <span>{profile.firstName}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium w-80">Last Name</span>
          <span>{profile.lastName}</span>
        </div>
        
        <div className="flex gap-2">
          <span className="font-medium w-80">Email</span>
          <span>{profile.email}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium w-80">Phone Number</span>
          <span>{profile.phone}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium w-80">Skill/Occupation</span>
          <span>{profile.occupation}</span>
        </div>
        <div className="flex gap-2 items-start">
          <span className="font-medium w-80">Biography</span>
          <p className="text-gray-700 flex-1">{profile.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
