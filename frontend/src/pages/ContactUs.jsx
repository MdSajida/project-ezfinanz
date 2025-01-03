// src/pages/ContactUs.jsx
import React from 'react';

const ContactUs = () => {
  return (
    <div className="container mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
      <p>If you have any questions, feel free to reach out to us.</p>
      
      <div className="mt-6">
        <h3 className="font-semibold text-lg">Our Location</h3>
        <div className="mt-2">
          <img src="https://via.placeholder.com/600x400?text=Map+Location" alt="Map" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
