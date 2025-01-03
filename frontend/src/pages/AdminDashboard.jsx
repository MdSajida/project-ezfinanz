// src/pages/AdminDashboard.jsx
import React from 'react';

const AdminDashboard = ({ logout }) => {
  return (
    <div className="container mx-auto my-10">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <p>Welcome to the Admin Dashboard.</p>
      <button onClick={logout} className="bg-red-500 text-white p-2 rounded mt-4">Logout</button>
    </div>
  );
};

export default AdminDashboard;