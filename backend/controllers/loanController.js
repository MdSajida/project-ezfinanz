const LoanApplication = require("../models/LoanApplication");

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
    res.status(201).json({ message: "Loan application submitted successfully", loanApplication });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { applyLoan };
