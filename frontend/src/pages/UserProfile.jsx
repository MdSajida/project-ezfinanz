// src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ user, logout }) => {
  const [userDetails, setUserDetails] = useState(null); // To store fetched user data
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To handle any errors
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Get token from localStorage
    // If token is null or not present, redirect to login page
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchUserDetails = async () => {
      try {
        
        const response = await fetch('http://localhost:8000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Send token in Authorization header
          },
        });
        let data;
        if (response.ok) {
         data = await response.json();
          setUserDetails(data.user); // Set user details if the request is successful
        } else {
          setError(data.message || 'Error fetching profile');
        }
      } catch (error) {
        setError(error.message); // Set error message if the request fails
      } finally {
        setLoading(false); // Stop loading once the request is complete
      }
    };

    fetchUserDetails(); // Call the function to fetch user details
  }, [navigate]); // Empty dependency array ensures this runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if the fetch fails
  }

  return (
    <div className="container mx-auto my-10 p-6 max-w-lg bg-white shadow-lg rounded-lg">
      <h2 className="text-5xl font-bold text-center text-gray-800 mb-10">User Profile</h2>
      <div className="flex flex-col items-center space-y-6">
        <div className="text-lg text-gray-700">
          <span className="font-semibold text-2xl">Name:</span>
          <span className="text-2xl text-gray-900 ml-2">{userDetails?.name}</span>
        </div>
        <div className="text-lg text-gray-700">
          <span className="font-semibold text-2xl">Email:</span>
          <span className="text-2xl text-gray-900 ml-2">{userDetails?.email}</span>
        </div>
        <div className="text-lg text-gray-700">
          <span className="font-semibold text-2xl">Phone:</span>
          <span className="text-2xl text-gray-900 ml-2">{userDetails?.phone}</span>
        </div>
      </div>
    </div>
  );
  
  
};

export default UserProfile;
