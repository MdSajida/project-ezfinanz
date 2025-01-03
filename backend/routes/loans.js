//# Loan-related routes

// routes/loans.js
const express = require("express");
const router = express.Router();
const { applyLoan } = require("../controllers/loanController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/apply", authMiddleware, applyLoan);

module.exports = router;

