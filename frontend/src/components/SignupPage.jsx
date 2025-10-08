import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginPage.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // If backend returns a token after signup, store and notify
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.dispatchEvent(new Event("tokenChanged"));
          // redirect to intended if provided
          const intended = location.state?.intended;
          if (intended) {
            if (intended.subject) {
              navigate(`/quiz/${intended.subject}`);
              return;
            }
            if (intended.action === "openQuiz") {
              navigate("/", { state: { scrollTo: "subjects" } });
              return;
            }
          }
          // otherwise go home
          navigate("/");
          return;
        }
        // otherwise go to login so user can sign in
        alert("Account created successfully! Please login.");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again later.");
    }
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
          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login", { state: { intended: location.state?.intended } });
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
