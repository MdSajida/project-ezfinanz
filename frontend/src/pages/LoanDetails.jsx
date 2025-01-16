import React from "react";

const LoanDetails = ({ loanDetails, onClose }) => {
  if (!loanDetails) return null;

  const {
    applicantName,
    loanAmountRequested,
    tenure,
    submissionTimestamp,
    cibilScore,
    annualIncome,
    totalCurrentDebt,
    employmentYears,
    repaymentMethod,
    creditworthinessScore,
    financialStabilityScore,
    totalScore,
    loanEligibilityStatus,
    offerLoanAmount,
    address,
  } = loanDetails;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 md:w-1/2">
        <h2 className="text-lg font-bold mb-4">Loan Details</h2>
        <div className="space-y-2">
          <p><strong>Applicant Name:</strong> {applicantName}</p>
          <p><strong>Loan Amount Requested:</strong> ₹{loanAmountRequested}</p>
          <p><strong>Tenure:</strong> {tenure} months</p>
          <p><strong>Submission Timestamp:</strong> {new Date(submissionTimestamp).toLocaleString()}</p>
          <p><strong>CIBIL Score:</strong> {cibilScore}</p>
          <p><strong>Annual Income:</strong> ₹{annualIncome}</p>
          <p><strong>Total Current Debt:</strong> ₹{totalCurrentDebt}</p>
          <p><strong>Employment Years:</strong> {employmentYears}</p>
          <p><strong>Repayment Method:</strong> {repaymentMethod}</p>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Creditworthiness Score:</strong> {creditworthinessScore}</p>
          <p><strong>Financial Stability Score:</strong> {financialStabilityScore}</p>
          <p><strong>Total Score:</strong> {totalScore}</p>
          <p><strong>Loan Eligibility Status:</strong> {loanEligibilityStatus ? "Eligible" : "Not Eligible"}</p>
          {offerLoanAmount !== undefined && (
            <p><strong>Offer Loan Amount:</strong> ₹{offerLoanAmount}</p>
          )}
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
