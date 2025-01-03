//# Middleware for auth checks
//# Custom middleware

// middleware/authMiddleware.js
// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided or invalid format" });
    }

    const token = authHeader.split(" ")[1];
    //console.log(token);
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    //console.log("Decoded Token:", decoded);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // If admin email, directly allow admin access
    if (decoded.userId === process.env.ADMIN_EMAIL) {
      req.isAdmin = true;
      return next();
    }
    // Fetch the user and attach to the request object
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // Attach user to the request object
    req.isAdmin = false; // Not an admin
    
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("AuthMiddleware Error:", error.message);
    res.status(401).json({ message: "Unauthorized access", error: error.message });
  }
};

module.exports = authMiddleware;
