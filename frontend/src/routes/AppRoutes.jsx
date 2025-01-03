import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import UserProfile from '../pages/UserProfile';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import AdminDashboard from '../pages/AdminDashboard';

const AppRoutes = ({user,setUser}) => {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />

          
      {/* Redirect to profile or admin dashboard based on user role */}
      <Route
        path="/profile"
        element={user?.role === 'user' ? <UserProfile user={user} /> : <Navigate to="/login" />}
      />

      <Route
        path="/admin"
        element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
      />

         {/* Static pages */}
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      </Routes>
   
  );
};

export default AppRoutes;
