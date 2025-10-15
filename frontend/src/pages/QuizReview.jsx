import React from "react";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const QuizReview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { questions, answers } = state || {};

  if (!questions) {
    return (
      <div style={{ padding: 24 }}>
        <h2>No review data</h2>
        <button onClick={() => navigate(-1)} style={{ padding: "8px 12px" }}>Back</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
      </div>
      <h2>Review Answers</h2>
      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        {questions.map((q, idx) => {
          const selected = answers?.[q.questionId];
          return (
            <div key={q.questionId} style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
              <div style={{ fontWeight: 700 }}>{idx + 1}. {q.questionText}</div>
              <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
                {q.options.map((opt) => {
                  const isCorrect = opt === q.correctAnswer;
                  const isSelected = opt === selected;
                  const bg = isCorrect ? "#c6f6d5" : isSelected && !isCorrect ? "#fed7d7" : "#fff";
                  const border = isCorrect ? "2px solid #48bb78" : isSelected && !isCorrect ? "2px solid #f56565" : "1px solid #ddd";
                  return (
                    <div key={opt} style={{ padding: 8, borderRadius: 6, background: bg, border }}>
                      <span style={{ fontWeight: isCorrect ? 700 : 500 }}>{opt}</span>
                      {isCorrect && <span style={{ marginLeft: 8, color: "#2f855a" }}> (Correct)</span>}
                      {isSelected && !isCorrect && <span style={{ marginLeft: 8, color: "#c53030" }}> (Your choice)</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      
    </div>
  );
};

export default QuizReview;
