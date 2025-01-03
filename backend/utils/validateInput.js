// utils/validateInput.js
const User = require("../models/User");

const validateInput = async (email, phone) => {
  // Initialize validation result object
  const validationErrors = {};

  // Check if email exists
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    validationErrors.email = "Email already exists.";
  }

  // Check if phone exists
  const existingPhone = await User.findOne({ phone });
  if (existingPhone) {
    validationErrors.phone = "Phone number already exists.";
  }

  return validationErrors;
};

module.exports = validateInput ;