import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Logo from "../assets/logo.png";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const handleNavigateToSignup = () => {
    navigate("/signup");
  };

  const handleNavigateToProfile = () => {
    navigate("/profile"); // (can add ProfilePage later)
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(); // refresh to update header state
  };

  return (
    <header className="header">
      <div className="container header-container">
        {/* Logo */}
        <div
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="IQruit Logo" />
          <span>IQruit</span>
        </div>

        {/* Navigation Buttons */}
        <div className="header-buttons">
          {!token ? (
            <>
              <button className="signin" onClick={handleNavigateToLogin}>
                Login
              </button>
              <button className="btn-primary" onClick={handleNavigateToSignup}>
                Signup
              </button>
            </>
          ) : (
            <>
              <button className="profile-btn" onClick={handleNavigateToProfile}>
                <FaUserCircle className="profile-icon" /> Profile
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
