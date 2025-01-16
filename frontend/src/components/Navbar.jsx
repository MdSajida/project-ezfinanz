// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, userRole, logout }) => {
  return (
    <nav className="bg-green-600 p-4 text-white ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">EZFINANZ</Link>
        <div className="space-x-4">
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
          {isLoggedIn ? (
            <>
              {userRole === 'admin' ? (
                <Link to="/admin" className="hover:underline">Admin Dashboard</Link>
              ) : (
                <Link to="/profile" className="hover:underline">Profile</Link>
              )}
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            
            <Link to="/login" className="px-4 hover:underline">Login</Link>
            
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

/*import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, userRole, logout }) => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="px-4">
      <h1 className="text-2xl font-bold">Loan App</h1>
      </Link>
        <div>
          <Link to="/login" className="px-4">Login</Link>
          <Link to="/signup" className="px-4">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;*/
