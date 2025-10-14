import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css"; // for button styling

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // redirect if not logged in
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

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="page">
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className="profile-container">
        <h2>My Profile</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {user.quizResults && user.quizResults.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <h3>Quiz Results</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {user.quizResults.map((result, index) => (
                <li key={index} style={{ marginBottom: 10, padding: 10, border: "1px solid #ccc", borderRadius: 5 }}>
                  <p><strong>Unit:</strong> {result.unit}</p>
                  <p><strong>Score:</strong> {result.score}/{result.total} ({Math.round((result.score / result.total) * 100)}%)</p>
                  <p><strong>Date:</strong> {new Date(result.date).toLocaleDateString()}</p>
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
