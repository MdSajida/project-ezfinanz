/*import React, { useEffect, useState } from "react";

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

export default Home;*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  return <span style={{ color: "#4CAF50", fontWeight: "bold", fontSize: "50px" }}>{currentText}</span>;
};

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate
   // Function to handle Apply for Loan click
   const handleApplyLoan = () => {
    // Check if the user is logged in by checking the token in localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // If token exists, user is logged in, redirect to Loan Application page
      navigate('/loan'); // Replace with your actual loan application route
    } else {
      // If no token, user is not logged in, redirect to Login page
      navigate('/login'); // Replace with your actual login route
    }
  };
  return (
    <div style={styles.container}>
      {/* Background Image */}
      <div style={styles.backgroundImage}>
        <div style={styles.overlay}>
          <div style={styles.textContainer}>
            <h2 style={styles.mainText}>Welcome to Our Loan Platform</h2>
            <h3 style={styles.typingText}>Our's is <TypingEffect />.</h3>
            <div style={styles.applyButtonContainer}>
              <button
                style={styles.applyButton}
                onClick={handleApplyLoan} 
              >
                Apply for Loan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Added Effectiveness Paragraph */}
      <div style={styles.paragraphContainer}>
        <p style={styles.paragraphText}>
          Our platform offers a seamless and user-friendly loan application process. With easy navigation, fast approval, and flexible terms, we provide the best experience for all your loan needs. Apply now and take the first step toward achieving your financial goals!
        </p>
      </div>

      {/* Add an image section with loan-related visuals */}
      <div style={styles.imageSection}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwvoBB9pM-y9QXFfB3bniIe6Ps04t97-lceA&s" alt="Loan App" style={styles.loanImage} />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcVNU_zOyiMQALBm2tS1alLK9rLP2dI6j0cPm2oQJOK47Wm2XfDt_je6CvrT0rbj0_uD8&usqp=CAU" alt="Loan App" style={styles.loanImage} />
        <img src="data:image/jpeg;base64,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" alt="Loan App" style={styles.loanImage} />
       </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  backgroundImage: {
    position: "relative",
    width: "100%",
    height: "100vh",
    backgroundImage: "url(https://www.fibe.in/_next/image/?url=https%3A%2F%2Faltcont.fibe.in%2Fwp-content%2Fuploads%2F2019%2F03%2FINSTANT-LOAN.png&w=3840&q=75)", // Add your beautiful background image here
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay to make text more readable
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
  },
  textContainer: {
    zIndex: 10,
    color: "#fff",
    padding: "0 20px",
  },
  mainText: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "20px",
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)", // Add text shadow for better readability
  },
  typingText: {
    fontSize: "36px",
    color: "#4CAF50",
    fontWeight: "bold",
    marginBottom: "30px",
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
  },
  applyButtonContainer: {
    marginTop: "20px",
  },
  applyButton: {
    padding: "12px 24px",
    fontSize: "18px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
  paragraphContainer: {
    marginTop: "40px",
    maxWidth: "900px",
    padding: "0 20px",
    textAlign: "center",
  },
  paragraphText: {
    fontSize: "18px",
    color: "#333",
    lineHeight: "1.6",
  },
  imageSection: {
    marginTop: "40px",
    width: "100%",
    display: "flex",
    //justifyContent: "center",
  },
  loanImage: {
    maxWidth: "800px",
    borderRadius: "8px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
  },
};

export default Home;