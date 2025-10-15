import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, UserCircle2 } from "lucide-react"; // 👈 Person icon added
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.log(err);
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  if (!user) return <p className="loading">Loading profile...</p>;

  return (
    <div className="page">
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="profile-container">
        {/* 👇 Profile Avatar Section */}
        <div className="avatar-container">
          {user.image ? (
            <img src={user.image} alt="Profile" className="profile-image" />
          ) : (
            <UserCircle2 size={100} color="#007bff" />
          )}
        </div>

        <h2>My Profile</h2>
        <div className="user-info">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        {user.quizResults && user.quizResults.length > 0 && (
          <div className="quiz-results">
            <h3>Quiz Results</h3>
            <ul>
              {user.quizResults.map((result, index) => (
                <li key={index} className="quiz-result-item">
                  <p><strong>Unit:</strong> {result.unit}</p>
                  <p>
                    <strong>Score:</strong> {result.score}/{result.total} (
                    {Math.round((result.score / result.total) * 100)}%)
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(result.date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
