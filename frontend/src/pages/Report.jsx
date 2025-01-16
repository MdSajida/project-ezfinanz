import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Report = () => {
  const { applicantName } = useParams();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState(null);

  useEffect(() => {
    // Fetch applicant data based on the name from dummy data or API
    const applicantData = {
      name: applicantName,
      cibilScore: 720,
      currentDebt: 300000,
      annualIncome: 600000,
      requestedLoanAmount: 200000,
      employerName: 'Infosys',
      designation: 'Senior Executive',
      submissionTimestamp: '2025-01-01T10:00:00Z',
      loanEligibility: 'eligible',
      loanAmountOffered: 1000,
    };
    setApplicant(applicantData);
  }, [applicantName]);

  if (!applicant) {
    return <div>Loading...</div>;
  }

  const dti = (applicant.currentDebt / applicant.annualIncome).toFixed(2);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Set title with a larger font and bold
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(`Loan Report Card for ${applicant.name}`, 20, 20);

    // Set subtitle with a normal font weight
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('Personal Details:', 20, 30);

    // Personal details
    doc.text(`Name: ${applicant.name}`, 20, 40);
    doc.text(`Annual Income: ₹${applicant.annualIncome}`, 20, 50);
    doc.text(`Requested Loan Amount: ₹${applicant.requestedLoanAmount}`, 20, 60);

    // Creditworthiness Metrics
    doc.setFont('helvetica', 'bold');
    doc.text('Creditworthiness Metrics:', 20, 70);

    doc.setFont('helvetica', 'normal');
    doc.text(`CIBIL Score: ${applicant.cibilScore}`, 20, 80);
    doc.text(`Debt-to-Income Ratio (DTI): ${dti}`, 20, 90);

    // Eligibility Decision
    doc.setFont('helvetica', 'bold');
    doc.text('Eligibility Decision:', 20, 100);

    doc.setFont('helvetica', 'normal');
    doc.text(`Status: ${applicant.loanEligibility}`, 20, 110);
    doc.text(`Loan Amount Offered: ₹${applicant.loanAmountOffered}`, 20, 120);

    // Add a line separator after the content
    doc.setLineWidth(0.5);
    doc.line(20, 130, 190, 130); // horizontal line

    // Add footer
    doc.setFontSize(10);
    doc.text('Generated by Loan App', 20, 140);

    // Save the PDF with a custom filename
    doc.save(`${applicant.name}_Loan_Report.pdf`);
  };

  const styles = {
    body: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f4f9',
      margin: 0,
      padding: 0,
    },
    reportCard: {
      maxWidth: '800px',
      margin: '40px auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    reportHeader: {
      textAlign: 'center',
      color: '#333',
      fontSize: '24px',
      marginBottom: '30px',
    },
    reportDetails: {
      fontSize: '16px',
      color: '#555',
    },
    sectionHeader: {
      fontSize: '18px',
      color: '#333',
      marginTop: '20px',
      marginBottom: '10px',
    },
    listItem: {
      margin: '8px 0',
    },
    listItemBold: {
      color: '#333',
    },
    button: {
      display: 'inline-block',
      padding: '12px 25px',
      backgroundColor: '#4CAF50',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '30px',
      textDecoration: 'none',
      width: '100%',
      textAlign: 'center',
    },
    backButton: {
      backgroundColor: '#007bff',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.reportCard}>
      <button
        style={{ ...styles.button, ...styles.backButton }}
        onClick={() => navigate('/')}
      >
        Back to Dashboard
      </button>

      <h2 style={styles.reportHeader}>Loan Report Card for {applicant.name}</h2>
      <div style={styles.reportDetails}>
        <h3 style={styles.sectionHeader}>Personal Details:</h3>
        <ul>
          <li style={styles.listItem}>
            <strong style={styles.listItemBold}>Name:</strong> {applicant.name}
          </li>
          <li style={styles.listItem}>
            <strong style={styles.listItemBold}>Annual Income:</strong> ₹
            {applicant.annualIncome}
          </li>
          <li style={styles.listItem}>
            <strong style={styles.listItemBold}>Requested Loan Amount:</strong>{' '}
            ₹{applicant.requestedLoanAmount}
          </li>
        </ul>

        <h3 style={styles.sectionHeader}>Creditworthiness Metrics:</h3>
        <ul>
          <li style={styles.listItem}>
            <strong style={styles.listItemBold}>CIBIL Score:</strong>{' '}
            {applicant.cibilScore}
          </li>
          <li style={styles.listItem}>
            <strong style={styles.listItemBold}>
              Debt-to-Income Ratio (DTI):
            </strong>{' '}
            {dti}
          </li>
        </ul>

        <h3 style={styles.sectionHeader}>Eligibility Decision:</h3>
        <ul>
          <li style={styles.listItem}>
            <strong style={styles.listItemBold}>Status:</strong>{' '}
            {applicant.loanEligibility}
          </li>
          <li style={styles.listItem}>
            <strong style={styles.listItemBold}>Loan Amount Offered:</strong> ₹
            {applicant.loanAmountOffered}
          </li>
        </ul>
      </div>

      <button onClick={generatePDF} style={styles.button}>
        Download Report as PDF
      </button>
    </div>
  );
};

export default Report;
