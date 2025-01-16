// routes/admin.js
const express = require("express");
const router = express.Router();
const LoanApplication = require("../models/LoanApplication");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const calculateCreditWorthiness = require("../utils/calculateCreditWorthiness");

// In your backend API
router.get('/loanapplication/:id', async (req, res) => {
  const loanApplicationId = req.params.id;
  
  // Fetch the loan application by ID
  const loanApplication = await LoanApplication.findById(loanApplicationId);

  if (loanApplication) {
    // Assuming loanApplication has a field "userId" that refers to the user
    const userId = loanApplication.userId;

    // Return the userId along with other relevant data
    res.json({ userId });
  } else {
    res.status(404).json({ message: 'Loan application not found' });
  }
});

// Fetch all loan applications with dynamic creditworthiness calculation
router.get("/loan-applications", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const loanApplications = await LoanApplication.find();

    // Dynamically calculate creditworthiness for each loan application
    const applicationsWithCreditworthiness = loanApplications.map((loan) => {
      //const creditworthiness = calculateCreditWorthiness(loan);

      return {
        loanId: loan._id,
        userId: loan.userId,
        loanAmountRequested: loan.loanAmountRequested,
        tenure: loan.tenure,
        cibilScore: loan.cibilScore,
        annualIncome: loan.annualIncome,
        totalCurrentDebt: loan.totalCurrentDebt,
        employmentYears: loan.employmentYears,
        repaymentMethod: loan.repaymentMethod,
        address: loan.address,
        submissionTimestamp: loan.submissionTimestamp,
        status: loan.status || "Pending",
        decision: loan.decision || "Not Reviewed",
     //   ...creditworthiness, // Add creditworthiness details dynamically
      };
    });

    res.status(200).json(applicationsWithCreditworthiness);
  } catch (error) {
    console.error("Error fetching loan applications:", error.message);
    res.status(500).json({ message: "Failed to fetch loan applications.", error: error.message });
  }
});

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
  console.log("fndn");
  console.log(userId);
      // Fetch user details
      const user = await User.findById(userId, "name email phone");
      console.log(user)
      if (user=="" || user==undefined) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Find loan applications for the specific user
      const loanApplication = await LoanApplication.findOne({ userId }).select(
        "loanAmountRequested tenure cibilScore annualIncome totalCurrentDebt employmentYears repaymentMethod status decision offerLoanAmount submissionTimestamp address"
      );

      console.log(loanApplication);
      if (!loanApplication) {
        return res.status(404).json({ message: "No loan applications found for this user." });
      }

       const creditworthiness = calculateCreditWorthiness(loanApplication);

       console.log( creditworthiness.offerLoanAmount);
    //  creditworthiness.loanEligibilityStatus,
    //    creditworthiness.offerLoanAmount,
    //    creditworthiness.dti
      // Format the response to include user details with loan data
      const response = {
        userDetails: {
          userId: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone
        },
        loanDetails:{
          loanAmountRequested: loanApplication.loanAmountRequested,
          tenure: loanApplication.tenure,
          cibilScore: loanApplication.cibilScore,
          annualIncome: loanApplication.annualIncome,
          totalCurrentDebt: loanApplication.totalCurrentDebt,
          employmentYears: loanApplication.employmentYears,
          repaymentMethod: loanApplication.repaymentMethod,
          status: loanApplication.status,
          decision: loanApplication.decision,
          submissionTimestamp:loanApplication.submissionTimestamp,
          loanEligibilityStatus: creditworthiness.loanEligibilityStatus,
          offerLoanAmounts: parseInt(creditworthiness.offerLoanAmount),
          dti: creditworthiness.dti,
          creditworthinessScore:creditworthiness.creditworthinessScore,
        financialStabilityScore:creditworthiness.creditworthinessScore,
        totalScore:creditworthiness.creditworthinessScore,
        }
       
      };
  
      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching user loan details:", error.message);
      res.status(500).json({ message: "Failed to fetch user details.", error: error.message });
    }
  });
  

module.exports = router;
