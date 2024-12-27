import React, { useState } from "react";
import {Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import './RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNo: "", 
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // For success feedback

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation logic (same as before)
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters long.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    const contactRegex = /^[0-9]{10}$/;
    if (!formData.contactNo) newErrors.contactNo = "Contact number is required.";
    else if (!contactRegex.test(formData.contactNo)) newErrors.contactNo = "Contact number must be 10 digits.";
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        const response = await fetch("http://10.200.206.226:8080/hr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            contactNo: formData.contactNo, // Match backend property name
          }),
        });
  
        if (response.ok) {
          const message = await response.text();
          alert(message); // Show success message
          console.log("User registered successfully!");
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            contactNo: "", // Reset the contact number field
            termsAccepted: false,
          });
        } else {
          const errorMessage = await response.text();
          alert(`Registration failed: ${errorMessage}`);
        }
      } catch (error) {
        console.error("Error occurred during registration:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };
  
  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>Registration</h2>

        {successMessage && <p className="success">{successMessage}</p>}
        {errors.apiError && <p className="error">{errors.apiError}</p>}

        {/* Username */}
        <div className="form-group">
          <FaUser className="form-icon" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <FaEnvelope className="form-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <FaLock className="form-icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <FaLock className="form-icon" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        {/* Contact Number */}
        <div className="form-group">
          <FaPhone className="form-icon" />
          <input
            type="text"
            name="contactNo"
            placeholder="Contact Number"
            value={formData.contactNo}
            onChange={handleChange}
            required
          />
          {errors.contactNo && <p className="error">{errors.contactNo}</p>}
        </div>

        {/* Terms and Conditions */}
        <div className="terms">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            required
          />
          <label>I agree to the terms & conditions</label>
          {errors.termsAccepted && <p className="error">{errors.termsAccepted}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="register-button">
          <Link to="/login">Register</Link>
        </button>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
