import React from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const user = {
    name: "Yashaswi",
    email: "yashaswi@example.com",
    phone: "+91-9876543210",
    address: "Bangalore, Karnataka, India",
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
