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
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 6 }}>{quizData.quizTitle}</h1>
      <p style={{ color: "#666", marginTop: 0 }}>{quizData.category} • {quizData.difficulty}</p>

      <div style={{ border: "1px solid #eee", padding: 16, borderRadius: 8, marginTop: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <div>Question {index + 1} of {questions.length}</div>
          <div style={{ color: "#666" }}>{questions[index].unit}</div>
        </div>

        <div style={{ fontWeight: 700, marginBottom: 12 }}>{current.questionText}</div>

        <div style={{ display: "grid", gap: 8 }}>
          {current.options.map((opt) => {
            const selected = answers[current.questionId] === opt;
            return (
              <button
                key={opt}
                onClick={() => selectOption(current.questionId, opt)}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: selected ? "2px solid #2b6cb0" : "1px solid #ddd",
                  background: selected ? "#ebf8ff" : "#fff",
                  cursor: "pointer",
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
          <div>
            <button onClick={goPrev} disabled={index === 0} style={{ marginRight: 8, padding: "8px 12px" }}>
              Previous
            </button>
            <button onClick={goNext} disabled={index === questions.length - 1} style={{ padding: "8px 12px" }}>
              Next
            </button>
          </div>

          {/* Show Submit only on last question. Do not show Review during the active quiz. */}
          <div>
            {index === questions.length - 1 && (
              <button
                onClick={handleSubmit}
                style={{
                  background: "#2b6cb0",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: 6,
                }}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
