const LoanApplication = require("../models/LoanApplication");
const User = require("../models/User");
const calculateCreditWorthiness = require("../utils/calculateCreditWorthiness");

const applyLoan = async (req, res) => {
  const { loanAmountRequested, tenure, cibilScore, annualIncome, totalCurrentDebt, employmentYears, repaymentMethod, address } = req.body;

  const loanApplication = new LoanApplication({
    userId: req.user.id, // Assuming `req.userId` is set by the authMiddleware
    loanAmountRequested,
    tenure,
    cibilScore,
    annualIncome,
    totalCurrentDebt,
    employmentYears,
    repaymentMethod,
    address,
  });

  try {
    await loanApplication.save();
    res.status(201).json({
      message: "Loan application submitted successfully",
      loanApplication,     
    });
    //res.status(201).json({ message: "Loan application submitted successfully", loanApplication });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { applyLoan };
/*
 // Calculate creditworthiness
      const creditworthiness = calculateCreditWorthiness(loanApplication);
    
    
    
    // Save the calculated creditworthiness in the loan application
    loanApplication.creditworthinessScore = creditworthiness.creditworthinessScore;
    loanApplication.financialStabilityScore = creditworthiness.financialStabilityScore;
    loanApplication.totalScore = creditworthiness.totalScore;
    loanApplication.loanEligibilityStatus = creditworthiness.loanEligibilityStatus;
    loanApplication.offerLoanAmount = creditworthiness.offerLoanAmount;
    
    
    
    creditworthiness: {
        creditworthinessScore: creditworthiness.creditworthinessScore,
        financialStabilityScore: creditworthiness.financialStabilityScore,
        totalScore: creditworthiness.totalScore,
        loanEligibilityStatus: creditworthiness.loanEligibilityStatus,
        offerLoanAmount: creditworthiness.offerLoanAmount,
        dti: creditworthiness.dti,
      }*/