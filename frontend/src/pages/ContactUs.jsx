import React, { useState } from "react";

// Contact Us Component
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We'll get back to you soon.");
  };

  return (
    <div style={styles.container}>
      <div style={styles.headingContainer}>
      { /*<h2 style={styles.heading}>Contact Us</h2>*/}
        <p style={styles.subHeading}>We’d love to hear from you!</p>
      </div>

      {/* Contact Information Section */}
      <div style={styles.contactInfo}>
        <h3 style={styles.sectionTitle}>Our Contact Information</h3>
        <p style={styles.paragraph}>
          Have questions or need assistance?
          <p>Feel free to reach out to us through any of the following channels:</p>
        </p>

        <ul style={styles.contactList}>
          <li style={styles.contactItem}>
            <strong>Email:</strong> support@loanapp.com
          </li>
          <li style={styles.contactItem}>
            <strong>Phone:</strong> +1 (123) 456-7890
          </li>
          <li style={styles.contactItem}>
            <strong>Address:</strong> 123 Loan Street, Suite 400, City, State, 12345
          </li>
        </ul>
      </div>

      {/* Contact Form */}
      <div style={styles.formContainer}>
        <h3 style={styles.sectionTitle}>Send Us a Message</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              style={styles.textarea}
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", // Centering content vertically
    marginTop: "2px",
    fontFamily: "Arial, sans-serif",
    paddingBottom: "50px",
    position: "relative",
    backgroundColor: "#f4f4f4", // Removed image, added plain background
    minHeight: "100vh", // Ensure full viewport height
  },
  headingContainer: {
    marginTop: "20px",
    textAlign: "center",
    marginBottom: "20px",
  },
  heading: {
    fontSize: "48px",
    fontWeight: "bold",
    color: "#333", // Dark color for contrast
  },
  subHeading: {
    fontSize: "18px",
    color: "#4CAF50",
    fontWeight: "bold",
    marginTop: "10px",
  },
  contactInfo: {
    maxWidth: "600px",
    textAlign: "center",
    marginBottom: "30px",
    padding: "20px",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333", // Dark color for contrast
    marginBottom: "15px",
  },
  paragraph: {
    fontSize: "16px",
    color: "#333", // Dark color for contrast
    lineHeight: "1.6",
    marginBottom: "15px",
  },
  contactList: {
    listStyleType: "none",
    padding: 0,
    fontSize: "16px",
    color: "#333", // Dark color for contrast
    margin: 0,
  },
  contactItem: {
    marginBottom: "10px",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: "600px",
    padding: "20px",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333", // Dark color for contrast
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
  },
  textarea: {
    width: "100%",
    height: "150px",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
  },
  submitButton: {
    padding: "12px 24px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
};

export default ContactUs;
