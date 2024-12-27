// import React, { useState } from "react";

// import { useNavigate } from "react-router-dom"; // Import useNavigate hook
// import axios from "axios"; // Import axios for HTTP requests
// import "./Forgot.css";

// export const Forgot = () => {
//   const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Change Password
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [otpSent, setOtpSent] = useState(false); // Track if OTP was sent
//   const [otpVerified, setOtpVerified] = useState(false); // Track if OTP was verified

//   const navigate = useNavigate(); // Initialize the navigate function

//   // Email validation
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }
//     setError("");

//     try {
//       // Send OTP request to the backend with email as a query parameter
//       const response = await axios.post(
//         `http://localhost:8080/api/forgot-password/request-otp?email=${email}`
//       );

//       if (response.data === "OTP is: 123456") {
//         // Assuming this is the backend success response
//         setOtpSent(true); // Mark OTP as sent
//         setStep(2); // Move to OTP step
//       } else {
//         setError(response.data); // Display error from backend (e.g., email not found)
//       }
//     } catch (error) {
//       setError("Error sending OTP. Please try again.");
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     if (otp.length !== 6 || isNaN(otp)) {
//       setError("Please enter a valid 6-digit OTP.");
//       return;
//     }
//     setError("");

//     // Verify OTP with the backend using query parameters
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/forgot-password/verify-otp",
//         {
//           email: email,
//           otp: otp,
//         }
//       );
//       if (response.data === "OTP verified") {
//         setOtpVerified(true); // Mark OTP as verified
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//     }

//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     if (newPassword.length < 6) {
//       setError("Password must be at least 6 characters long.");
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }
//     setError("");

//     // Send new password to the backend
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/forgot-password/reset-password",
//         { email, newPassword }
//       );

//       if (response.data === "Password changed successfully") {
//         alert("Password changed successfully!");
//         navigate("/login"); // Redirect to login page after successful password reset
//       } else {
//         setError(response.data); // Handle backend error if any
//       }
//     } catch (error) {
//       setError("Error changing password. Please try again.");
//     }

//     // Reset form fields
//     setStep(1); // Reset to the initial step
//     setEmail("");
//     setOtp("");
//     setNewPassword("");
//     setConfirmPassword("");
//   };

//   return (
//     <div className="forgot-password-container">
//       <h2>Forgot Password</h2>

//       {step === 1 && (
//         <form onSubmit={handleEmailSubmit} className="forgot-password-form">
//           <div className="form-group">
//             <label htmlFor="email">Email Address:</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           {error && <div className="error-message">{error}</div>}
//           <button type="submit" className="submit-button">
//             Send OTP
//           </button>
//         </form>
//       )}

//       {step === 2 && (
//         <form onSubmit={handleOtpSubmit} className="forgot-password-form">
//           <div className="form-group">
//             <label htmlFor="otp">Enter OTP:</label>
//             <input
//               type="text"
//               id="otp"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter the 6-digit OTP"
//               maxLength="6"
//               required
//             />
//           </div>
//           {error && <div className="error-message">{error}</div>}
//           <button type="submit" className="submit-button">
//             Verify OTP
//           </button>
//         </form>
//       )}

//       {step === 3 && (
//         <form onSubmit={handlePasswordSubmit} className="forgot-password-form">
//           <div className="form-group">
//             <label htmlFor="newPassword">New Password:</label>
//             <input
//               type="password"
//               id="newPassword"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               placeholder="Enter new password"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm Password:</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="Confirm new password"
//               required
//             />
//           </div>
//           {error && <div className="error-message">{error}</div>}
//           <button type="submit" className="submit-button">
//             Change Password
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Forgot;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Forgot.css";

// export const Forgot = () => {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   // Validate email
//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateEmail(email)) {
//       setError("Please enter a valid email.");
//       return;
//     }
//     setError("");

//     try {
//       const response = await axios.post(
//         `/api/forgot-password/request-otp?email=${email}`
//       );
//       if (response.data.includes("OTP is")) {
//         setStep(2);
//       } else {
//         setError(response.data);
//       }
//     } catch (error) {
//       setError("Error sending OTP.");
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     if (!otp || otp.length !== 6 || isNaN(otp)) {
//       setError("Please enter a valid 6-digit OTP.");
//       return;
//     }
//     setError("");

//     try {
//       const response = await axios.post(
//         `/api/forgot-password/verify-otp?email=${email}&otp=${otp}`
//       );
//       if (response.data === "OTP verified") {
//         setStep(3);
//       } else {
//         setError(response.data);
//       }
//     } catch (error) {
//       setError("Error verifying OTP.");
//     }
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }
//     setError("");

//     try {
//       // Assuming an endpoint for resetting the password
//       const response = await axios.post(`/api/forgot-password/reset-password`, {
//         email,
//         newPassword,
//       });
//       if (response.data === "Password changed successfully") {
//         alert("Password changed successfully!");
//         navigate("/login");
//       } else {
//         setError(response.data);
//       }
//     } catch (error) {
//       setError("Error changing password.");
//     }
//   };

//   return (
//     <div className="forgot-password-container">
//       <h2>Forgot Password</h2>
//       {step === 1 && (
//         <form onSubmit={handleEmailSubmit}>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <button type="submit">Send OTP</button>
//           {error && <p>{error}</p>}
//         </form>
//       )}
//       {step === 2 && (
//         <form onSubmit={handleOtpSubmit}>
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             required
//           />
//           <button type="submit">Verify OTP</button>
//           {error && <p>{error}</p>}
//         </form>
//       )}
//       {step === 3 && (
//         <form onSubmit={handlePasswordSubmit}>
//           <input
//             type="password"
//             placeholder="New Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Change Password</button>
//           {error && <p>{error}</p>}
//         </form>
//       )}
//     </div>
//   );
// };

// export default Forgot;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Forgot.css";

// export const Forgot = () => {
//   const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Change Password
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   // Email validation
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }
//     setError("");

//     try {
//       const response = await axios.post(
//         /api/forgot-password/request-otp?email=${email}
//       );

//       if (response.data.startsWith("OTP is")) {
//         setStep(2); // Move to OTP step
//       } else {
//         setError(response.data);
//       }
//     } catch (error) {
//       setError("Error sending OTP. Please try again.");
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     if (otp.length !== 6 || isNaN(otp)) {
//       setError("Please enter a valid 6-digit OTP.");
//       return;
//     }
//     setError("");

//     try {
//       const response = await axios.post(
//         /api/forgot-password/verify-otp?email=${email}&otp=${otp}
//       );

//       if (response.data === "OTP verified") {
//         setStep(3); // Move to Change Password step
//       } else {
//         setError(response.data);
//       }
//     } catch (error) {
//       setError("Error verifying OTP. Please try again.");
//     }
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     if (newPassword.length < 6) {
//       setError("Password must be at least 6 characters long.");
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }
//     setError("");

//     try {
//       // Call the reset-password endpoint
//       const response = await axios.post(
//         /api/forgot-password/reset-password,
//         null,
//         {
//           params: {
//             email: email,
//             newPassword: newPassword,
//           },
//         }
//       );

//       if (response.data === "Password reset successfully!") {
//         alert("Password changed successfully!");
//         navigate("/login"); // Redirect to login page
//       } else {
//         setError(response.data);
//       }
//     } catch (error) {
//       setError("Error updating password. Please try again.");
//     }
//   };

//   return (
//     <div className="forgot-password-container">
//       <h2>Forgot Password</h2>

//       {step === 1 && (
//         <form onSubmit={handleEmailSubmit} className="forgot-password-form">
//           <div className="form-group">
//             <label htmlFor="email">Email Address:</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           {error && <div className="error-message">{error}</div>}
//           <button type="submit" className="submit-button">
//             Send OTP
//           </button>
//         </form>
//       )}

//       {step === 2 && (
//         <form onSubmit={handleOtpSubmit} className="forgot-password-form">
//           <div className="form-group">
//             <label htmlFor="otp">Enter OTP:</label>
//             <input
//               type="text"
//               id="otp"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter the 6-digit OTP"
//               maxLength="6"
//               required
//             />
//           </div>
//           {error && <div className="error-message">{error}</div>}
//           <button type="submit" className="submit-button">
//             Verify OTP
//           </button>
//         </form>
//       )}

//       {step === 3 && (
//         <form onSubmit={handlePasswordSubmit} className="forgot-password-form">
//           <div className="form-group">
//             <label htmlFor="newPassword">New Password:</label>
//             <input
//               type="password"
//               id="newPassword"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               placeholder="Enter new password"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm Password:</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="Confirm new password"
//               required
//             />
//           </div>
//           {error && <div className="error-message">{error}</div>}
//           <button type="submit" className="submit-button">
//             Change Password
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Forgot;
//
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Forgot.css";

// Set Axios base URL and headers globally
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const Forgot = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Change Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    try {
      const response = await axios.post(
        "/api/forgot-password/request-otp",
        null,
        {
          params: { email },
        }
      );

      if (response.data.startsWith("OTP is")) {
        setStep(2); // Move to OTP step
      } else {
        setError(response.data);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6 || isNaN(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    setError("");

    try {
      const response = await axios.post(
        "/api/forgot-password/verify-otp",
        null,
        {
          params: { email, otp },
        }
      );

      if (response.data === "OTP verified") {
        setStep(3); // Move to Change Password step
      } else {
        setError(response.data);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");

    try {
      const response = await axios.post(
        "/api/forgot-password/reset-password",
        null,
        {
          params: { email, newPassword },
        }
      );

      if (response.data === "Password reset successfully!") {
        alert("Password changed successfully!");
        navigate("/login"); // Redirect to login page
      } else {
        setError(response.data);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleAxiosError = (error) => {
    if (error.response) {
      setError(error.response.data || "Server error. Please try again.");
    } else if (error.request) {
      setError("No response from server. Please try again.");
    } else {
      setError("Error: " + error.message);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>

      {step === 1 && (
        <form onSubmit={handleEmailSubmit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-button">
            Send OTP
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleOtpSubmit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="otp">Enter OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the 6-digit OTP"
              maxLength="6"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-button">
            Verify OTP
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handlePasswordSubmit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-button">
            Change Password
          </button>
        </form>
      )}
    </div>
  );
};

export default Forgot;
