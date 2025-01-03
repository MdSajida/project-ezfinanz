// middleware/adminMiddleware.js
const adminMiddleware = (req, res, next) => {
    if (req.isAdmin) {
      next(); // Proceed if the user is an admin
    } else {
      res.status(403).json({ message: "Access denied. Admins only." });
    }
  };
  
  module.exports = adminMiddleware;
  