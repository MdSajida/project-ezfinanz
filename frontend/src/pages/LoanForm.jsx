import React, { useState } from "react";
import { validateName, validateEmail, validatePhone } from "../utils/validations";
import "./Loanf.css"; // Import custom styles
import { useNavigate } from "react-router-dom";

const LoanForm = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    income: "",
    loanAmount: "",
    tenure: "",
    cibilScore: "",
    employmentYears: "", // Added for employment years
    repaymentMethod: "",
    state: "", // Address field instead of pincode
    district: "", // Added district
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    newErrors.name = validateName(formData.name);
    newErrors.email = validateEmail(formData.email);
    newErrors.phone = validatePhone(formData.phone);

  

    // Income validation
    if (!formData.income || isNaN(formData.income) || formData.income <= 0) {
      newErrors.income = "Valid income is required.";
    }

    // Loan Amount validation
    if (!formData.loanAmount || isNaN(formData.loanAmount) || formData.loanAmount <= 0) {
      newErrors.loanAmount = "Loan amount should be a positive number.";
    }
   

     // Loan Amount validation
     if (!formData. totalCurrentDebt || isNaN(formData. totalCurrentDebt) || formData. totalCurrentDebt <= 0) {
        newErrors. totalCurrentDebt = "Loan amount should be a positive number.";
      }

    // Tenure validation
    if (!formData.tenure || isNaN(formData.tenure) || formData.tenure <= 0) {
      newErrors.tenure = "Tenure should be a positive number.";
    }

     
     if (!formData.employmentYears || isNaN(formData.employmentYears) || formData.employmentYears <= 0) {
        newErrors.employmentYears= "Years should be a positive number.";
      }

    // CIBIL Score validation
    if (!formData.cibilScore || formData.cibilScore < 300 || formData.cibilScore > 900) {
      newErrors.cibilScore = "CIBIL score must be between 300 and 900.";
    }

  

    // Designation validation
    if (!formData.repaymentMethod) newErrors.repaymentMethod = "Method is required.";

    // Address validation (since it's a simple address box)
    if (!formData.state || formData.state.length < 2) {
      newErrors.state = "District name is required.";
    }

    // District validation
    if (!formData.district || formData.district.length < 3) {
      newErrors.district = "District name is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).filter((key) => newErrors[key]).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    //alert("Application submitted successfully!");
     // Prepare the data to send to the backend
     const loanData = {
        loanAmountRequested: formData.loanAmount,
        tenure: formData.tenure,
        cibilScore: formData.cibilScore,
        annualIncome: formData.income,
        totalCurrentDebt: formData.totalCurrentDebt, // You can set this to 0 if it's not part of the form
        employmentYears: formData.employmentYears,
        repaymentMethod: formData.repaymentMethod,
        address: {
            state: formData.state,        // Send state as a separate field
            district: formData.district,  // Send district as a separate field
          },
      };
      try {
        // Sending the request with fetch
        const response = await fetch('http://localhost:8000/api/loans/apply', {  // Update the URL with your actual backend API endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`, // JWT token for authorization (if needed)
          },
          body: JSON.stringify(loanData),
        });
    
        // Parse the JSON response
        const data = await response.json();
    
        // Handle success response
        if (data.message) {
         // alert(data.message); // Show the success message from the backend
         console.log("success")
        } else {
         console.log('Something went wrong, no message received');
         return;
        }
       
        navigate('/acknowledgement');
    
      } catch (error) {
        console.error('Error submitting the application:', error);
        alert('There was an error submitting your loan application.');
      }
    

  };

  return (
    <div className="loan-form-container">
      <h2>Loan Application Form</h2>
      <form className="loan-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Personal Details</h3>
          <div className="personal-details">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}

            <label htmlFor="employmentYears">EmploymentYears:</label>
            <input
              type="number"
              name="employmentYears"
              id="employmentYears"
              placeholder="employmentYears"
              value={formData.employmentYears}
              onChange={handleChange}
            />
            {errors.employmentYears && <p className="error">{errors.employmentYears}</p>}

            <label htmlFor="state">State:</label>
            <input
              type="text"
              name="state"
              id="state"
              placeholder="state"
              value={formData.state}
              onChange={handleChange}
            />
            {errors.state && <p className="error">{errors.state}</p>}

            <label htmlFor="district">District:</label>
            <input
              type="text"
              name="district"
              id="district"
              placeholder="District"
              value={formData.district}
              onChange={handleChange}
            />
            {errors.district && <p className="error">{errors.district}</p>}
          </div>
        </div>

        <div className="form-section">
          <h3>Financial Data</h3>
          <div className="financial-details">
            <label htmlFor="income">Annual Income:</label>
            <input
              type="number"
              name="income"
              id="income"
              placeholder="Annual Income"
              value={formData.income}
              onChange={handleChange}
            />
            {errors.income && <p className="error">{errors.income}</p>}

            <label htmlFor="loanAmount">Requested Loan Amount:</label>
            <input
              type="number"
              name="loanAmount"
              id="loanAmount"
              placeholder="Requested Loan Amount"
              value={formData.loanAmount}
              onChange={handleChange}
            />
            {errors.loanAmount && <p className="error">{errors.loanAmount}</p>}

            <label htmlFor="tenure">Tenure:</label>
            <input
              type="number"
              name="tenure"
              id="tenure"
              placeholder="Tenure"
              value={formData.tenure}
              onChange={handleChange}
            />
            {errors.tenure && <p className="error">{errors.tenure}</p>}

            <label htmlFor="cibilScore">CIBIL Score:</label>
            <input
              type="number"
              name="cibilScore"
              id="cibilScore"
              placeholder="CIBIL Score"
              value={formData.cibilScore}
              onChange={handleChange}
            />
            {errors.cibilScore && <p className="error">{errors.cibilScore}</p>}

           
            <label htmlFor="totalCurrentDebt">Total Debts:</label>
            <input
              type="number"
              name="totalCurrentDebt"
              id="totalCurrentDebt"
              placeholder="CurrentDebts"
              value={formData.totalCurrentDebt}
              onChange={handleChange}
            />
            {errors.totalCurrentDebt&& <p className="error">{errors.totalCurrentDebt}</p>}


            <label htmlFor="repaymentMethod">repaymentMethod:</label>
            <select
              name="repaymentMethod"
              id="repaymentMethod"
              value={formData.repaymentMethod}
              onChange={handleChange}
            >
              <option value="">Select repaymentMethod</option>
              <option value="Manual">Manual</option>
              <option value="Auto-Debit">Auto-Debit</option>
              
            </select>
            {errors.repaymentMethod && <p className="error">{errors.repaymentMethod}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" onClick={handleSubmit}>Submit Application</button>
      </form>
    </div>
  );
};
export default LoanForm;