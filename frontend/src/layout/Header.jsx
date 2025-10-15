import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Logo from "../assets/logo.png";
import "./Header.css";

const parseJwt = (token) => {
  try {
    if (!token) return null;
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded?.username || decoded?.name || decoded?.email || null;
  } catch {
    return null;
  }
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")));
  const [username, setUsername] = useState(parseJwt(localStorage.getItem("token")));

  useEffect(() => {
    const refreshFromStorage = () => {
      const t = localStorage.getItem("token");
      setIsLoggedIn(Boolean(t));
      setUsername(parseJwt(t));
    };
    refreshFromStorage();

    const onStorage = () => refreshFromStorage();
    window.addEventListener("storage", onStorage);

    const onTokenChanged = () => refreshFromStorage();
    window.addEventListener("tokenChanged", onTokenChanged);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("tokenChanged", onTokenChanged);
    };
  }, []);

  const handleNavigateToChatbot = () => {
    navigate("/chatbot");
  };

  const handleNavigateToLogin = () => navigate("/login");
  const handleNavigateToSignup = () => navigate("/signup");
  const handleNavigateToProfile = () => navigate("/profile");
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("tokenChanged"));
    setIsLoggedIn(false);
    setUsername(null);
    navigate("/");
  };

  const handleNavigateToQuiz = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location.pathname, intended: { action: "openQuiz" } } });
      return;
    }

    if (location.pathname === "/") {
      window.dispatchEvent(new Event("scrollToSubjects"));
    } else {
      navigate("/", { state: { scrollTo: "subjects" } });
    }
  };

  return (
    <header
      className="header"
      style={{ borderBottom: "1px solid #e6e6e6", background: "#fff" }}
    >
      <div
        className="container header-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        {/* Logo */}
        <div
          className="logo"
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="IQruit Logo" style={{ width: 36, height: 36 }} />
          <span style={{ fontWeight: 700, fontSize: 18 }}>IQruit</span>
        </div>

        {/* Navigation Buttons */}
        <nav
          className="header-buttons"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          {/* Quiz button */}
          <button
            type="button"
            className="quiz-btn"
            onClick={handleNavigateToQuiz}
            style={{
              background: "transparent",
              border: "1px solid #2b6cb0",
              color: "#2b6cb0",
              padding: "8px 12px",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Quiz
          </button>

          {/* Chatbot button */}
          <button
            type="button"
            className="chatbot-btn"
            onClick={handleNavigateToChatbot}
            style={{
              background: "transparent",
              border: "1px solid #2b6cb0",
              color: "#2b6cb0",
              padding: "8px 12px",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Chatbot
          </button>

          {!isLoggedIn ? (
            <>
              <button
                type="button"
                className="signin"
                onClick={handleNavigateToLogin}
                style={{
                  background: "transparent",
                  border: "1px solid #ccc",
                  padding: "8px 12px",
                  borderRadius: 6,
                  cursor: "pointer",
                  color: "#2b6cb0",
                  fontWeight: 600,
                }}
                aria-label="Sign in"
              >
                Sign in
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleNavigateToSignup}
                style={{
                  background: "#2b6cb0",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Signup
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="profile-btn"
                onClick={handleNavigateToProfile}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  border: "1px solid #ccc",
                  padding: "8px 12px",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                <FaUserCircle className="profile-icon" />
                <span>{username || "Profile"}</span>
              </button>
              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
                style={{
                  background: "#e53e3e",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
