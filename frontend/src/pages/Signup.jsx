
// src/pages/Signup.jsx
import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { validateName, validateEmail, validatePassword, validatePhone } from '../utils/validations'; // Import validation functions

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [errors, setErrors] = useState({}); // State for errors
  const [showPassword, setShowPassword] = useState(false);

// Toggle password visibility
  const togglePassword = () => setShowPassword(!showPassword);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear errors as user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
   
    const validationErrors = {};

    // Validate each field
    const nameError = validateName(formData.name);
    if (nameError) validationErrors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) validationErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) validationErrors.password = passwordError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) validationErrors.phone = phoneError;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Show errors
    } else {
     // console.log(formData); // Handle form submission
       // Save trimmed name and log formData
       const trimmedFormData = { ...formData, name: formData.name.trim(),phone: formData.phone.trim(),email: formData.email.trim(),password: formData.password.trim(), };
       console.log(trimmedFormData);
       // Clear the form after submission
      setFormData({ name: '', email: '', password: '', phone: '' });
      setErrors({});
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-md">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="Name" type="text" name="name" value={formData.name} onChange={handleChange}  error={errors.name}/>
        <InputField label="Email" type="text" name="email" value={formData.email} onChange={handleChange}   error={errors.email}/>
        <InputField 
        label="Password" 
        type="password" 
        name="password" 
        value={formData.password} 
        onChange={handleChange} 
        error={errors.password}
        togglePassword={togglePassword}
        showPassword={showPassword}
        />
        <InputField label="Phone" type="text" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone}/>
        <Button text="Signup" />
      </form>
      <p className="mt-4">
        Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Click here to Login</Link>
      </p>
    </div>
  );
};

export default Signup;