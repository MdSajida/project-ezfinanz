//# For loan applications
// routes/loans.js
// models/LoanApplication.js
const mongoose = require("mongoose");

const loanApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  loanAmountRequested: { type: Number, required: true },
  tenure: { type: Number, required: true },
  cibilScore: { type: Number, required: true },
  annualIncome: { type: Number, required: true },
  totalCurrentDebt: { type: Number, required: true },
  employmentYears: { type: Number, required: true },
  repaymentMethod: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Pending, Seen, Decided
  decision: { type: String, default: "N/A" },
  offerLoanAmount: { type: Number, default: 0 },
  submissionTimestamp: { type: Date, default: Date.now },
  address: {
    district: { type: String, required: true },
    state: { type: String, required: true },
  },
});

module.exports = mongoose.model("LoanApplication", loanApplicationSchema);
