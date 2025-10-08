import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // store JWT exactly as returned by backend
        if (data.token) {
          localStorage.setItem("token", data.token);
          // notify same-tab listeners (Header listens for this)
          window.dispatchEvent(new Event("tokenChanged"));
        }

        // handle intended redirect if provided
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

        // default redirect after login
        navigate("/");
      } else {
        alert(data.message || "Invalid email or password!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="page">
      <div className="login-container">
        <h2>Welcome Back!</h2>
        <form className="login-form" onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup", { state: { intended: location.state?.intended } });
            }}
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
