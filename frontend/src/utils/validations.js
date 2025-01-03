// src/utils/validations.js

// Validate Name (Only alphabets and spaces allowed)
export const validateName = (name) => {
    if (!name.trim()) {
      return "Name is required.";
    }
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name.trim()) ? null : "Name should contain only alphabets.";
  };
  // Validate Email (Using a simple regex for validation)
  export const validateEmail = (email) => {
    if (!email.trim()) {
        return "Email is required.";
      }
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email.trim()) ? null : "Enter a valid email address.";
  };
  
  // Validate Password (Minimum 6 characters, must include a number and a special character)
  export const validatePassword = (password) => {
    if (!password.trim()) {
      return "Password is required.";
    }
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password.trim())
      ? null
      : "Password must contain at least 6 characters, a number, and a special character.";
  };

  // Validate Phone Number (Only digits, and length of 10 digits)
  export const validatePhone = (phone) => {
    if (!phone.trim()) {
        return "Phone number is required.";
      }
    const regex = /^\d{10}$/;
    return regex.test(phone.trim())? null : "Invalid phone number. Please enter a 10-digit number.";
  };
  