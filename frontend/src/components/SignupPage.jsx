import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = () => {
    if (!formData.email) {
      alert("Please enter your email before requesting OTP!");
      return;
    }
    // Simulate sending OTP
    setIsOtpSent(true);
    alert(`OTP sent to ${formData.email}`);
  };

  const verifyOtp = () => {
    if (formData.otp === "123456") {
      setIsVerified(true);
      alert("Email verified successfully!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert("Please verify your email before signing up.");
      return;
    }
    alert("Account created successfully!");
    navigate("/login");
  };

  return (
  <div className="page">
    <div className="signup-container">
      <h2>Create Account</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* OTP Section */}
        {isOtpSent && (
          <div className="otp-section">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="verify-btn"
              onClick={verifyOtp}
            >
              Verify
            </button>
          </div>
        )}

        {!isOtpSent ? (
          <button type="button" onClick={sendOtp}>
            Send Verification Code
          </button>
        ) : (
          <button type="submit">Sign Up</button>
        )}
      </form>

      <p>
        Already have an account?{" "}
        <a href="#" onClick={() => navigate("/login")}>
          Login
        </a>
      </p>
    </div>
  </div>
);

};

export default SignupPage;
