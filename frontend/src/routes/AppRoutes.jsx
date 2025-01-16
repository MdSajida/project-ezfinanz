//routes//AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import UserProfile from '../pages/UserProfile';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import AdminDashboard from '../pages/AdminDashboard';
import Loan from '../pages/LoanForm';  // Import the Loan page
import LoanForm from '../pages/LoanForm';
import Report from '../pages/Report';
import AcknowledgmentPage from '../pages/Acknowledgment';

const AppRoutes = ({user,setUser}) => {
   // Logout function
   const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setUser(null); // Clear user data
    window.location.href = '/'; // Redirect to home page
  };
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/acknowledgement" element={<AcknowledgmentPage />} />

          
      {/* Redirect to profile or admin dashboard based on user role */}
      <Route
        path="/profile"
        element={user?.role === 'user' ? <UserProfile user={user} logout={logout}/> : <Navigate to="/login" />}
      />

      <Route
        path="/admin"
        element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
      />

      <Route
        path="/admin/report/:applicantName"
        element={user?.role === 'admin' ? <Report /> : <Navigate to="/login" />}
      />
       {/* Add the Loan route */}
       <Route
        path="/loan"
        element={user ? <LoanForm /> : <Navigate to="/login" />} // If user is logged in, go to Loan, else redirect to Login
      />
         {/* Static pages */}
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      </Routes>
   
  );
};

export default AppRoutes;
