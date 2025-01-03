// src/pages/Login.jsx
import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { validateEmail} from '../utils/validations'; // Import validation functions
import { useNavigate } from 'react-router-dom';



const Login = ({setUser}) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({}); // State for errors
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear errors as user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};

    // Validate email
    const emailError = validateEmail(formData.email);
    if (emailError) validationErrors.email = emailError;

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Show errors if validation fails
    } else {
      //console.log(formData); // Log form data (or handle login logic here)
      setFormData({ ...formData, email: formData.email.trim(),password: formData.password.trim()});
      console.log(formData);
       // Dummy login check
    if (formData.email === 'admin@example.com' && formData.password === 'admin') {
      setRole('admin');
      setUser({ email:formData.email, role: 'admin' });
      navigate('/admin');
    } else{
      setRole('user');
      setUser({ email:formData.email, role: 'user' });
      navigate('/profile');
    }
      setFormData({ email: '', password: '' }); // Clear form fields
      setErrors({}); // Clear errors
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-md">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          togglePassword={togglePassword}
          showPassword={showPassword}
        />
        <Button text="Login" />
      </form>
    </div>
  );
};

export default Login;
