// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 MyApp. All Rights Reserved.</p>
        <div className="mt-2">
          <a href="/about" className="mx-2 hover:underline">About Us</a>
          <a href="/contact" className="mx-2 hover:underline">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
