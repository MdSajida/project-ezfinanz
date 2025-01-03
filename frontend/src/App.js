import './App.css';

// src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import Home from './pages/Home';
import { BrowserRouter } from 'react-router-dom';


const App = () => {
  const [user, setUser] = useState(null);// User login state

  const logout = () => {
    setUser(null);// Logout logic
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Navbar isLoggedIn={!!user} userRole={user?.role} logout={logout} />
        <AppRoutes user={user} setUser={setUser} />
      </BrowserRouter> 
    </div>
  );
};

export default App;