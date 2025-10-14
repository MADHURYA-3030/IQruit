import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { score, total, questions, answers, unit } = state || {};
  const savedRef = useRef(false);

 useEffect(() => {
  const saveResult = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await axios.post(
        "http://localhost:5000/api/auth/save-result",
        { score, total, unit },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Result saved once");
    } catch (err) {
      console.log("Failed to save result:", err);
    }
  };

  // Save only once, and only when all fields are valid
  if (score && total && unit && !savedRef.current) {
    savedRef.current = true; // <-- set immediately
    saveResult(); // then call async save
  }
}, [score, total, unit]);


  if (typeof score !== "number" || typeof total !== "number") {
    return (
      <div style={{ padding: 24 }}>
        <h2>No result data</h2>
        <button onClick={() => navigate("/")} style={{ padding: "8px 12px", marginTop: 12 }}>
          Back
        </button>
      </div>
    );
  }

  const percent = Math.round((score / Math.max(total, 1)) * 100);
  const incorrect = total - score;

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
        {/* Radial progress */}
        <div style={{ width: 140, height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg viewBox="0 0 36 36" width="120" height="120">
            <defs>
              <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2b6cb0" />
                <stop offset="100%" stopColor="#48bb78" />
              </linearGradient>
            </defs>
            <path
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#eee"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="url(#g1)"
              strokeWidth="2.5"
              strokeDasharray={`${percent} ${100 - percent}`}
              strokeDashoffset="25"
              strokeLinecap="round"
            />
            <text x="18" y="20.5" textAnchor="middle" fontSize="6" fill="#111" fontWeight="700">
              {percent}%
            </text>
            <text x="18" y="26.5" textAnchor="middle" fontSize="2.6" fill="#666">
              {score}/{total}
            </text>
          </svg>
        </div>

        {/* Summary and bars */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <h2 style={{ margin: 0 }}>Quiz Result</h2>
          <p style={{ marginTop: 6, color: "#555" }}>{unit ? `${unit} — ` : ""}You answered <strong>{score}</strong> out of <strong>{total}</strong> correct.</p>

          {/* horizontal bar */}
          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ width: "100%", background: "#eee", height: 16, borderRadius: 8, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${percent}%`,
                    height: "100%",
                    background: "linear-gradient(90deg,#2b6cb0,#48bb78)",
                    transition: "width 400ms ease",
                  }}
                />
              </div>
              <div style={{ minWidth: 48, textAlign: "right", color: "#333", fontWeight: 700 }}>{percent}%</div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 10, color: "#444", fontSize: 14 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ width: 12, height: 12, background: "#48bb78", display: "inline-block", borderRadius: 3 }} />
                <span>Correct: {score}</span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ width: 12, height: 12, background: "#f56565", display: "inline-block", borderRadius: 3 }} />
                <span>Incorrect: {incorrect}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
            <button
              onClick={() => navigate(`/quiz${unit ? `/${encodeURIComponent(unit.toLowerCase().replace(/\s+/g, "-"))}` : ""}`, { state: { unit } })}
              style={{ padding: "8px 14px", borderRadius: 6, border: "1px solid #2b6cb0", background: "transparent", color: "#2b6cb0", cursor: "pointer" }}
            >
              Retake
            </button>

            <button
              onClick={() => navigate("/quiz/review", { state: { questions, answers, unit, score, total } })}
              style={{ padding: "8px 14px", borderRadius: 6, border: "none", background: "#2b6cb0", color: "#fff", cursor: "pointer" }}
            >
              Review Answers
            </button>

            <button
              onClick={() => navigate("/")}
              style={{ padding: "8px 14px", borderRadius: 6, border: "1px solid #ccc", background: "transparent", color: "#333", cursor: "pointer" }}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
