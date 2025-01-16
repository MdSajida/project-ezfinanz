const calculateCreditWorthiness = (applicant) => {
    let cibilPoints = 0;
    let dtiPoints = 0;
    let incomeStabilityPoints = 0;
    let employmentReliabilityPoints = 0;
    let repaymentMethodPoints = 0;
  
    // CIBIL Score Classification

    //console.log("here in cibil")
    //console.log(applicant)
    if (applicant.cibilScore >= 750) cibilPoints = 30;
    else if (applicant.cibilScore >= 700) cibilPoints = 20;
    else if (applicant.cibilScore >= 300) cibilPoints = 10;
    else cibilPoints = 0;


    //console.log(cibilPoints);
    // Debt-to-Income Ratio (DTI)
    const dti = applicant.totalCurrentDebt / applicant.annualIncome;
    if (dti < 0.2) dtiPoints = 30;
    else if (dti >= 0.2 && dti < 0.3) dtiPoints = 20;
    else if (dti >= 0.3 && dti < 0.4) dtiPoints = 10;
    else dtiPoints = 0;
  
    // Income Stability
    const incomeToLoanRatio = applicant.annualIncome / applicant.loanAmount;
    if (incomeToLoanRatio >= 5) incomeStabilityPoints = 20;
    else if (incomeToLoanRatio >= 3) incomeStabilityPoints = 10;
    else if (incomeToLoanRatio >= 2) incomeStabilityPoints = 5;
    else incomeStabilityPoints = 0;
  
    // Employment Reliability
    if (applicant.employmentYears > 3) employmentReliabilityPoints = 20;
    else if (applicant.employmentYears >= 1) employmentReliabilityPoints = 10;
    else employmentReliabilityPoints = 0;
  
    // Repayment Method
    if (applicant.repaymentMethod === "Auto-Debit") repaymentMethodPoints = 10;
    else if (applicant.repaymentMethod === "Manual") repaymentMethodPoints = 5;
  
    // Scoring
    const creditworthinessScore = cibilPoints + dtiPoints;
    const financialStabilityScore =
      incomeStabilityPoints +
      employmentReliabilityPoints +
      repaymentMethodPoints;
  
    const totalScore = creditworthinessScore + financialStabilityScore;
  
    let loanEligibilityStatus = "Not Eligible";
    let offerLoanAmount = 0;
  
    if (totalScore >= 80) {
      loanEligibilityStatus = "Eligible";
      offerLoanAmount = applicant.loanAmount; // Fully eligible for the requested amount
    } else if (totalScore >= 50) {
      loanEligibilityStatus = "Partially Eligible";
      offerLoanAmount = applicant.annualIncome / 3; // Example: Offer 1/3 of annual income
    } else {

      loanEligibilityStatus = "Not Eligible";
      offerLoanAmount = applicant.annualIncome / 5; // Example: Offer 1/5 of annual income
    }
  
    return {
      creditworthinessScore,
      financialStabilityScore,
      totalScore,
      loanEligibilityStatus,
      offerLoanAmount,
      dti
    };
  };

  module.exports = calculateCreditWorthiness;