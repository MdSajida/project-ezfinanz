// API route handlers
//Login and signup routes

// routes/auth.js
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);

// Example protected route for user profile
router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Profile details", user: req.user });
  });

module.exports = router;

//   router.get("/see",
//     async (req, res) => {
        
//           res.status(201).json({ message: "in get requeest" });
        
//     }
//   );
