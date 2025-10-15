import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import cnUnit1 from "../data/cn/cn-unit-1.json";
import cnUnit2 from "../data/cn/cn-unit-2.json";
import cnUnit3 from "../data/cn/cn-unit-3.json";
import cnUnit4 from "../data/cn/cn-unit-4.json";
import cnUnit5 from "../data/cn/cn-unit-5.json";
import dbmsUnit1 from "../data/dbms/dbms-unit-1.json";
import dbmsUnit2 from "../data/dbms/dbms-unit-2.json";
import dbmsUnit3 from "../data/dbms/dbms-unit-3.json";
import dbmsUnit4 from "../data/dbms/dbms-unit-4.json";
import dbmsUnit5 from "../data/dbms/dbms-unit-5.json";
import osUnit1 from "../data/os/os-unit-1.json";
import osUnit2 from "../data/os/os-unit-2.json";
import osUnit3 from "../data/os/os-unit-3.json";
import osUnit4 from "../data/os/os-unit-4.json";
import osUnit5 from "../data/os/os-unit-5.json";
import BackButton from "./BackButton";

const slugToUnit = (slug) => {
  if (!slug) return null;
  const map = { cn: "Computer Networks", dbms: "Database Management", os: "Operating Systems" };
  return map[slug] || slug.replace(/-/g, " ");
};

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();

  // determine requested unit from multiple sources (state, query, url param)
  const requestedUnit =
    location.state?.unit ||
    (searchParams.get("unit") ? searchParams.get("unit") : null) ||
    slugToUnit(params.subject);

  // Map unit numbers to their respective data for different subjects
  const unitDataMap = {
    cn: {
      1: cnUnit1,
      2: cnUnit2,
      3: cnUnit3,
      4: cnUnit4,
      5: cnUnit5,
    },
    dbms: {
      1: dbmsUnit1,
      2: dbmsUnit2,
      3: dbmsUnit3,
      4: dbmsUnit4,
      5: dbmsUnit5,
    },
    os: {
      1: osUnit1,
      2: osUnit2,
      3: osUnit3,
      4: osUnit4,
      5: osUnit5,
    },
  };

  // Determine subject from URL or state
  const subject = location.state?.subject || params.subject || 'cn';
  const subjectUnits = unitDataMap[subject] || unitDataMap['cn'];

  const quizData = subjectUnits[requestedUnit] || subjectUnits[1]; // default to unit 1 if not found

  const allQuestions = quizData.questions || [];

  const questions = allQuestions; // Since we're loading the specific unit data, all questions are for that unit

  useEffect(() => {
    if (requestedUnit && !questions.length) {
      console.warn("No questions matched requested unit:", requestedUnit);
    }
  }, [questions, requestedUnit]);

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // questionId -> selected option

  useEffect(() => {
    setIndex(0);
    setAnswers({});
  }, [questions]);

  if (!questions.length) {
    return (
      <div style={{ padding: 24 }}>
        <h2>No questions available</h2>
        <p>
          Return home and select a subject.
          <button onClick={() => navigate("/")} style={{ marginLeft: 12 }}>Back</button>
        </p>
      </div>
    );
  }

  const current = questions[index];

  const selectOption = useCallback((qId, option) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  }, []);

  const goNext = useCallback(() => setIndex((i) => Math.min(i + 1, questions.length - 1)), [questions.length]);
  const goPrev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  const computeScore = useCallback(() => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.questionId] === q.correctAnswer) correct++;
    });
    return correct;
  }, [questions, answers]);

  const handleSubmit = useCallback(() => {
    const score = computeScore();
    const payload = { score, total: questions.length, questions, answers, unit: requestedUnit };
    navigate("/quiz/result", { state: payload });
  }, [computeScore, navigate, questions, answers, requestedUnit]);

  const handleReview = useCallback(() => {
    navigate("/quiz/review", { state: { questions, answers, unit: requestedUnit } });
  }, [navigate, questions, answers, requestedUnit]);

 return (
  <div
    style={{
      padding: "40px 24px",
      maxWidth: "900px",
      margin: "0 auto",
      fontFamily: "'Poppins', sans-serif",
      color: "#1a202c",
      background: "linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)",
      minHeight: "100vh",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    {/* 🔙 Back Button Row */}
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <button
        onClick={() => {
          if (window.history.length > 1) navigate(-1);
          else navigate("/subjects/computer-networks"); // fallback
        }}
        style={{
          backgroundColor: "#2b6cb0",
          color: "#fff",
          border: "none",
          padding: "10px 18px",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: "500",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(43, 108, 176, 0.3)",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e3a8a")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2b6cb0")}
      >
        Back
      </button>
    </div>

    {/* Title Section */}
    <div style={{ textAlign: "center", marginBottom: "24px" }}>
      <h1 style={{ marginBottom: 6, color: "#1e3a8a", fontSize: "28px" }}>
        {quizData.quizTitle}
      </h1>
      <p style={{ color: "#555", marginTop: 0, fontSize: "16px" }}>
        {quizData.category} • {quizData.difficulty}
      </p>
    </div>

    {/* Question Card */}
    <div
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease",
        width: "100%",
        maxWidth: "800px",
      }}
    >
      {/* Question Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
          fontSize: "15px",
          fontWeight: 500,
          color: "#4a5568",
        }}
      >
        <div>
          <span style={{ color: "#2b6cb0", fontWeight: 600 }}>
            Question {index + 1}
          </span>{" "}
          of {questions.length}
        </div>
        <div style={{ color: "#718096" }}>{questions[index].unit}</div>
      </div>

      {/* Question Text */}
      <div
        style={{
          fontWeight: 700,
          fontSize: "18px",
          marginBottom: "16px",
          lineHeight: "1.5",
          color: "#2d3748",
        }}
      >
        {current.questionText}
      </div>

      {/* Options */}
      <div style={{ display: "grid", gap: 10 }}>
        {current.options.map((opt) => {
          const selected = answers[current.questionId] === opt;
          return (
            <button
              key={opt}
              onClick={() => selectOption(current.questionId, opt)}
              style={{
                textAlign: "left",
                padding: "12px 16px",
                borderRadius: "10px",
                border: selected
                  ? "2px solid #2b6cb0"
                  : "1px solid #cbd5e0",
                background: selected ? "#ebf8ff" : "#f8fafc",
                cursor: "pointer",
                transition: "all 0.25s ease",
                fontSize: "15px",
                fontWeight: 500,
                color: selected ? "#2b6cb0" : "#1a202c",
                boxShadow: selected
                  ? "0 3px 8px rgba(43,108,176,0.3)"
                  : "0 2px 6px rgba(0,0,0,0.05)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#edf2f7")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = selected
                  ? "#ebf8ff"
                  : "#f8fafc")
              }
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {/* Prev/Next */}
        <div>
          <button
            onClick={goPrev}
            disabled={index === 0}
            style={{
              marginRight: 10,
              padding: "10px 16px",
              background: index === 0 ? "#e2e8f0" : "#2b6cb0",
              color: index === 0 ? "#718096" : "#fff",
              border: "none",
              borderRadius: 8,
              cursor: index === 0 ? "not-allowed" : "pointer",
              transition: "background 0.3s ease",
              fontWeight: 500,
            }}
          >
            Previous
          </button>
          <button
            onClick={goNext}
            disabled={index === questions.length - 1}
            style={{
              padding: "10px 16px",
              background:
                index === questions.length - 1 ? "#e2e8f0" : "#2b6cb0",
              color:
                index === questions.length - 1 ? "#718096" : "#fff",
              border: "none",
              borderRadius: 8,
              cursor:
                index === questions.length - 1
                  ? "not-allowed"
                  : "pointer",
              fontWeight: 500,
            }}
          >
            Next
          </button>
        </div>

        {/* Submit Button */}
        {index === questions.length - 1 && (
          <button
            onClick={handleSubmit}
            style={{
              background: "linear-gradient(90deg, #3182ce, #63b3ed)",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 3px 12px rgba(49,130,206,0.3)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            Submit
          </button>
        )}
      </div>
    </div>
  </div>
);


};

export default QuizPage;
