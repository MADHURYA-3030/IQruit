import React from "react";
import { useNavigate } from "react-router-dom";

import BackButton from "./BackButton"; // import the reusable button

const ComputerNetworks = () => {
  const navigate = useNavigate();
  const units = [1, 2, 3, 4, 5];

  const handleNavigate = (unit) => {
    navigate(`/quiz/unit${unit}`, { state: { unit, subject: 'cn' } });
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f8ff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative", /* required for absolute BackButton */
      }}
    >
      <BackButton /> {/* ← Back button added here */}
    
      <BackButton />
      <h1 style={{ color: "#003366", marginBottom: "30px" }}>Computer Networks</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          width: "80%",
          maxWidth: "800px",
        }}
      >
        {units.map((unit) => (
          <div
            key={unit}
            style={{
              backgroundColor: "#ffffff",
              border: "2px solid #007bff",
              borderRadius: "12px",
              padding: "30px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h2 style={{ color: "#003366" }}>Unit {unit}</h2>
            <button
              onClick={() => handleNavigate(unit)}
              style={{
                marginTop: "10px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Go to Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComputerNetworks;
