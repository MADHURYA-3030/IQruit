import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // simulate login success
    localStorage.setItem("token", "dummyToken");
    navigate("/"); // back to landing page
    window.location.reload();
  };

  return (
    <div className="page">
      <div className="login-container">
        <h2>Welcome Back!</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
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
