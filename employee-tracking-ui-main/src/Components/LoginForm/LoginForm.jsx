import React, { useState } from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loginMessage, setLoginMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Optional: Make password stronger (lowercase, uppercase, digit, special character)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 6 characters, and contain a letter and a number.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const params = new URLSearchParams();
        params.append("email", email);
        params.append("password", password);

        const response = await axios.post(
          "http://localhost:8080/api/login",
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        setLoginMessage(response.data.message || "Login successful!");
      } catch (error) {
        console.error("Login failed:", error);
        setLoginMessage("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className={`input-box ${errors.email ? "error" : ""}`}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
          />
          <FaUser className="icon" />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className={`input-box ${errors.password ? "error" : ""}`}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
          <FaLock className="icon" />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <div className="button">
          <button type="submit">Login</button>
        </div>

        {loginMessage && <p className="login-message">{loginMessage}</p>}

        <div className="registration">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
