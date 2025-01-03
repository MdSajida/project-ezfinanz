// routes/admin.js
const express = require("express");
const router = express.Router();
const LoanApplication = require("../models/LoanApplication");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// API to fetch all users with loan details
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const usersWithLoans = await LoanApplication.aggregate([
      {
        $lookup: {
          from: "users", // Collection name for User
          localField: "userId", // Field in LoanApplication
          foreignField: "_id", // Field in User
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails", // Deconstruct the userDetails array
      },
      {
        $project: {
          name: "$userDetails.name",
         // email: "$userDetails.email",
          loanAmountRequested: "$loanAmountRequested",
          tenure: "$tenure",
          submissionTimestamp: "$submissionTimestamp",
          decision: "$decision",
        },
      },
    ]);
    res.status(200).json(usersWithLoans);
  } catch (error) {
    console.error("Error fetching users with loan details:", error.message);
    res.status(500).json({ message: "Failed to fetch users.", error: error.message });
  }
});

/// API to fetch details of a specific user with loan details
router.get("/users/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Fetch user details
      const user = await User.findById(userId, "name email phone");
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Find loan applications for the specific user
      const loanApplications = await LoanApplication.find({ userId }).select(
        "loanAmountRequested tenure cibilScore annualIncome totalCurrentDebt employmentYears repaymentMethod status decision offerLoanAmount submissionTimestamp address"
      );
  
      if (loanApplications.length === 0) {
        return res.status(404).json({ message: "No loan applications found for this user." });
      }
  
      // Format the response to include user details with loan data
      const response = {
        userDetails: {
          userId: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone
        },
        loanDetails: loanApplications.map((loan) => ({
          loanAmountRequested: loan.loanAmountRequested,
          tenure: loan.tenure,
          cibilScore: loan.cibilScore,
          annualIncome: loan.annualIncome,
          totalCurrentDebt: loan.totalCurrentDebt,
          employmentYears: loan.employmentYears,
          repaymentMethod: loan.repaymentMethod,
          status: loan.status,
          decision: loan.decision,
          offerLoanAmount: loan.offerLoanAmount,
          submissionTimestamp: loan.submissionTimestamp,
          address: loan.address
        }))
      };
  
      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching user loan details:", error.message);
      res.status(500).json({ message: "Failed to fetch user details.", error: error.message });
    }
  });
  

module.exports = router;
