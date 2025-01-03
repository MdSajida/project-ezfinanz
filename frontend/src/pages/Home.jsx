import React, { useEffect, useState } from "react";

// Typing Effect Component
const TypingEffect = () => {
  const texts = ["The Best Platform", "Easy and Fast Loans", "Apply Now"];
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      let currentWord = texts[index];
      if (!deleting) {
        setCurrentText((prev) => prev + currentWord.charAt(prev.length));
        if (currentText.length === currentWord.length) {
          setDeleting(true);
        }
      } else {
        setCurrentText(currentText.slice(0, -1));
        if (currentText.length === 0) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, 150);
    return () => clearInterval(interval);
  }, [currentText, deleting, index]);

  return <span style={{ color: "#4CAF50", fontWeight: "bold" ,fontSize: "50px"}}>{currentText}</span>;
};

const Home = () => {
  return (
    <div className="home-container" style={styles.container}>
      <div style={styles.sideText}>
        <h2>
          Our's is <TypingEffect />.
        </h2>
      </div>
      
      <div style={styles.applyButtonContainer}>
        <button
          style={styles.applyButton}
          onClick={() => alert("Redirecting to Loan Application")}
        >
          Apply for Loan
        </button>
      </div>

      {/* Added Effectiveness Paragraph */}
      <div style={styles.paragraphContainer}>
        <p style={styles.paragraphText}>
          Our platform offers a seamless and user-friendly loan application
          process. With easy navigation, fast approval, and flexible terms, we
          provide the best experience for all your loan needs. Apply now and
          take the first step toward achieving your financial goals!
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f9",
    flexDirection: "column",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  sideText: {
    fontSize: "50px",
    marginBottom: "30px", // Increased spacing for better visibility
  },
  applyButtonContainer: {
    marginTop: "20px",
  },
  applyButton: {
    padding: "12px 24px", // Decreased size of the button
    fontSize: "16px", // Decreased font size of the button
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
  paragraphContainer: {
    marginTop: "20px", // Added margin for better spacing
    maxWidth: "600px", // Limited the width to prevent stretching
  },
  paragraphText: {
    fontSize: "14px",
    color: "#333",
    lineHeight: "1.6",
    padding: "0 15px",
  },
};

export default Home;
