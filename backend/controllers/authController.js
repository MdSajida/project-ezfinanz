const User = require("../models/User");
const hashPassword = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");
const validateInput = require("../utils/validateInput");

const signup = async (req, res) => {
  const { name,email, phone, password  } = req.body;

  try {
    // Validate input
    const validationErrors = await validateInput(email, phone);

    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({ message: "Validation failed.", errors: validationErrors });
    }

   

    const user = new User({
      name,
      email,
      phone,
      password
     
    });

    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PWRD) {
        // If email and password match the admin credentials, treat as admin
        const token = generateToken(email); // Generate token using admin email
        // Return token for admin
        return res.status(200).json({ message: "Admin login successful", isAdmin: true ,  token });
      } else {
        // If not the admin and user is not found
        return res.status(400).json({ message: "User not found, please sign up." });
      }
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    const token = generateToken(user._id);
    res.status(200).json({ user, token,isAdmin: false  });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { signup, login };
