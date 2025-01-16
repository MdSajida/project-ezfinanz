import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";
import "jspdf-autotable";
const AdminDashboard = () => {
  const [loanApplications, setLoanApplications] = useState([]);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  // Fetch all loan applications
  const fetchLoanApplications = async () => {
    try {
      const response = await fetch("http://localhost:8000/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setLoanApplications(data);
        
      } else {
        console.error("Error fetching loan applications:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch loan applications:", error);
    }
  };

  // Fetch details of a specific user
  const fetchUserDetails = async (loanApplicationId) => {
    try {
      // Step 1: Fetch the userId using the loan application ID
      const loanAppResponse = await fetch(`http://localhost:8000/admin/loanapplication/${loanApplicationId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
        },
      });
  
      const loanAppData = await loanAppResponse.json();
      if (loanAppResponse.ok) {
        const userId = loanAppData.userId; // Get the userId from loan application response
  
        // Step 2: Fetch the user details using the userId
        const userResponse = await fetch(`http://localhost:8000/admin/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        const userData = await userResponse.json();
        if (userResponse.ok) {
          setSelectedUserDetails(userData); // Store user details for display
        } else {
          console.error("Error fetching user details:", userData.message);
        }
      } else {
        console.error("Error fetching loan application:", loanAppData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  useEffect(() => {
    fetchLoanApplications();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {!selectedUserDetails && (
        <>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Applicant Name</th>
                <th className="border px-4 py-2">Loan Amount Requested</th>
                <th className="border px-4 py-2">Tenure</th>
                <th className="border px-4 py-2">Submission Timestamp</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loanApplications.map((application) => (
                <tr key={application._id}>
                  <td className="border px-4 py-2">{application.name}</td>
                  <td className="border px-4 py-2">{application.loanAmountRequested}</td>
                  <td className="border px-4 py-2">{application.tenure}</td>
                  <td className="border px-4 py-2">{application.submissionTimestamp}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() =>  fetchUserDetails(application._id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

    
      {selectedUserDetails && (
  <div>
    <button
      className="mb-4 bg-gray-300 text-black px-4 py-2 rounded"
      onClick={() => setSelectedUserDetails(null)}
    >
      Back to Dashboard
    </button>
    <h2 className="text-xl font-bold mb-4">User Details</h2>
    <div className="border p-4 rounded bg-gray-100">
      <p>
        <strong>Name:</strong> {selectedUserDetails.userDetails.name}
      </p>
      <p>
        <strong>Email:</strong> {selectedUserDetails.userDetails.email}
      </p>
      <p>
        <strong>Phone:</strong> {selectedUserDetails.userDetails.phone}
      </p>

      <h3 className="text-lg font-bold mt-4">Loan Details:</h3>
      <div className="mb-4 p-2 border rounded">
        <p>
          <strong>Loan Amount Requested:</strong> {selectedUserDetails.loanDetails.loanAmountRequested}
        </p>
        <p>
          <strong>Tenure:</strong> {selectedUserDetails.loanDetails.tenure}
        </p>
        <p>
          <strong>CIBIL Score:</strong> {selectedUserDetails.loanDetails.cibilScore}
        </p>
        <p>
          <strong>Eligibility Status:</strong> {selectedUserDetails.loanDetails.loanEligibilityStatus}
        </p>
        <p>
          <strong>Loan Offer:</strong> {selectedUserDetails.loanDetails.offerLoanAmounts}
        </p>
      </div>
      <button
  className="bg-green-500 text-white px-4 py-2 rounded mt-4"
  onClick={() => generateReport(selectedUserDetails)}
>
  Download Report
</button>
    </div>
  </div>
)}

    </div>
  );
};

// Function to generate a report (example: console log)

// Function to generate a report and download it
const generateReport = (userDetails) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text("Loan Application Report", 105, 10, { align: "center" });

  // User Details Section
  doc.setFontSize(12);
  doc.text("User Details:", 10, 20);
  doc.autoTable({
    startY: 25,
    head: [["Field", "Value"]],
    body: [
      ["Name", userDetails.userDetails.name],
      ["Email", userDetails.userDetails.email],
      ["Phone", userDetails.userDetails.phone],
    ],
  });

  // Loan Details Section
  doc.text("Loan Details:", 10, doc.lastAutoTable.finalY + 10);
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 15,
    head: [["Field", "Value"]],
    body: [
      ["Loan Amount Requested", userDetails.loanDetails.loanAmountRequested],
      ["Tenure", userDetails.loanDetails.tenure],
      ["CIBIL Score", userDetails.loanDetails.cibilScore],
      ["Eligibility Status", userDetails.loanDetails.loanEligibilityStatus],
      ["Loan Offer", userDetails.loanDetails.offerLoanAmounts],
      ["Annual Income", userDetails.loanDetails.annualIncome],
      ["Employment Years", userDetails.loanDetails.employmentYears],
      ["Financial Stability Score", userDetails.loanDetails.financialStabilityScore],
    ],
  });

  // Save the PDF
  doc.save(`Loan_Report_${userDetails.userDetails.name}.pdf`);
  alert("Report downloaded successfully!");
};




/*import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [loanApplications, setLoanApplications] = useState([]);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  // Fetch all loan applications
  const fetchLoanApplications = async () => {
    try {
      const response = await fetch("http://localhost:8000/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setLoanApplications(data);
      } else {
        console.error("Error fetching loan applications:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch loan applications:", error);
    }
  };

  // Fetch details of a specific user
  const fetchUserDetails = async (
    userId) => {
    try {
      console.log("fronend")
      console.log(
        userId);
      const response = await fetch(`http://localhost:8000/admin/users/${
        userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
        },
      });
     
      const data = await response.json();
     
      console.log("hhh")
      if (response.ok) {
        setSelectedUserDetails(data);
      } else {
        console.error("Error fetching user details:", data.message);
        console.log("heres the rror")
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  useEffect(() => {
    fetchLoanApplications();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {!selectedUserDetails && (
        <>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Applicant Name</th>
                <th className="border px-4 py-2">Loan Amount Requested</th>
                <th className="border px-4 py-2">Tenure</th>
                <th className="border px-4 py-2">Submission Timestamp</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loanApplications.map((application) => (
               
                <tr key={application.
                  _id}>
                  <td className="border px-4 py-2">{application.name}</td>
                  <td className="border px-4 py-2">{application.loanAmountRequested}</td>
                  <td className="border px-4 py-2">{application.tenure}</td>
                  <td className="border px-4 py-2">{application.submissionTimestamp}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => fetchUserDetails(application.userId.toString())}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {selectedUserDetails && (
        <div>
          <button
            className="mb-4 bg-gray-300 text-black px-4 py-2 rounded"
            onClick={() => setSelectedUserDetails(null)}
          >
            Back to Dashboard
          </button>
          <h2 className="text-xl font-bold mb-4">User Details</h2>
          <div className="border p-4 rounded bg-gray-100">
            <p>
              <strong>Name:</strong> {selectedUserDetails.userDetails.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUserDetails.userDetails.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedUserDetails.userDetails.phone}
            </p>

            <h3 className="text-lg font-bold mt-4">Loan Details:</h3>
            {selectedUserDetails.loanDetails.map((loan, index) => (
              <div key={index} className="mb-4 p-2 border rounded">
                <p>
                  <strong>Loan Amount Requested:</strong> {loan.loanAmountRequested}
                </p>
                <p>
                  <strong>Tenure:</strong> {loan.tenure}
                </p>
                <p>
                  <strong>CIBIL Score:</strong> {loan.cibilScore}
                </p>
                <p>
                  <strong>Eligibility Status:</strong> {loan.loanEligibilityStatus}
                </p>
                <p>
                  <strong>Loan Offer:</strong> {loan.offerLoanAmount}
                </p>
              </div>
            ))}
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => generateReport(selectedUserDetails)}
            >
              Generate Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Function to generate a report (example: console log)
const generateReport = (userDetails) => {
  console.log("Generating report for:", userDetails);
  alert("Report generated successfully! (Check console for details)");
};*/

export default AdminDashboard;


















// src/pages/AdminDashboard.jsx
/*import React from 'react';

const AdminDashboard = ({ logout }) => {
  return (
    <div className="container mx-auto my-10">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <p>Welcome to the Admin Dashboard.</p>
      <button onClick={logout} className="bg-red-500 text-white p-2 rounded mt-4">Logout</button>
    </div>
  );
};

export default AdminDashboard;*/


/* src/components/LoanDashboard.js
import React, { useEffect, useState } from "react";
import LoanDetails from "./LoanDetails";


const AdminDashboard= () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await fetch("/api/admin/loan-applications"); // Update with your API endpoint
      const data = await response.json();
      setLoans(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching loans:", error);
      setLoading(false);
    }
  };

  const handleEvaluate = async (loanId) => {
    try {
      const response = await fetch(`/api/admin/loan-applications/${loanId}/evaluate`, {
        method: "POST",
      });
      const data = await response.json();

      setLoans((prevLoans) =>
        prevLoans.map((loan) =>
          loan.loanId === loanId ? { ...loan, ...data.evaluationResult } : loan
        )
      );

      alert(`Evaluation completed for Loan ID: ${loanId}`);
    } catch (error) {
      console.error("Error evaluating loan:", error);
    }
  };



  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-4">Admin Dashboard</h2>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div>
          <button
           // onClick={handleGenerateReport}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Generate Report
          </button>
          <table className="w-full bg-white border-collapse shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Applicant Name</th>
                <th className="border px-4 py-2">Loan Amount Requested</th>
                <th className="border px-4 py-2">Tenure</th>
                <th className="border px-4 py-2">Submission Timestamp</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.loanId} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{loan.applicantName}</td>
                  <td className="border px-4 py-2">{loan.loanAmountRequested}</td>
                  <td className="border px-4 py-2">{loan.tenure}</td>
                  <td className="border px-4 py-2">{loan.submissionTimestamp}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEvaluate(loan.loanId)}
                      className="mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Evaluate
                    </button>
                    <button
                      onClick={() => setSelectedLoan(loan)}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedLoan && <LoanDetails loan={selectedLoan} />}
        </div>
      )}
    </div>
  );
};

*/



