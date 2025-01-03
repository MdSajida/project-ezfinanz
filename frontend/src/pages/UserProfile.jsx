// src/pages/UserProfile.jsx
import React from 'react';

const UserProfile = ({ user, logout }) => {
  return (
    <div className="container mx-auto my-10">
      <h2 className="text-3xl font-bold mb-4">User Profile</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={logout} className="bg-red-500 text-white p-2 rounded mt-4">Logout</button>
    </div>
  );
};

export default UserProfile;
