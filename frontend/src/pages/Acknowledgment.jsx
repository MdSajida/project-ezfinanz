import React from 'react';

function AcknowledgmentPage() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAyk7eUVbUUZ5gQYQO7ux-Qc_yNhwQFeUeYQ&s')" }}
    >
      <div className="text-center text-black p-4">
        <h1 className="text-5xl font-bold">Thank You!</h1>
        <p className="mb-3 text-lg">
          Thank you for providing your details. Our team will review your eligibility and get back to you shortly.
        </p>
      </div>
    </div>
  );
}

export default AcknowledgmentPage;
