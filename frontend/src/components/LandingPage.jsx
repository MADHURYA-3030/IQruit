import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Computer from "../assets/Computer.png";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const subjectsRef = useRef(null);

  useEffect(() => {
    // scroll when navigated with location.state
    if (location.state && location.state.scrollTo === "subjects") {
      setTimeout(() => {
        subjectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        navigate(location.pathname, { replace: true, state: {} });
      }, 50);
    }
  }, [location, navigate]);

  // listen for same-page header click events
  useEffect(() => {
    const onScrollRequest = () => {
      subjectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("scrollToSubjects", onScrollRequest);
    return () => window.removeEventListener("scrollToSubjects", onScrollRequest);
  }, []);

  const unitToSlug = (unit) => {
    if (!unit) return "";
    const m = {
      "Computer Networks": "cn",
      "Database Management": "dbms",
      "Operating Systems": "os",
    };
    return m[unit] || unit.toLowerCase().replace(/\s+/g, "-");
  };

  // require login before navigating to quiz page
  const handleStartQuiz = (unit) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // send user to login and indicate intended subject so login can redirect back
      const intended = unit ? { subject: unitToSlug(unit) } : { subject: null };
      navigate("/login", { state: { from: location.pathname, intended } });
      return;
    }

    // user logged in -> navigate to quiz route
    if (unit) {
      const slug = unitToSlug(unit);
      navigate(`/quiz/${slug}`);
    } else {
      navigate("/quiz");
    }

    // fallback: if SPA route not applied, full reload after short delay
    setTimeout(() => {
      if (window.location.pathname.indexOf("/quiz") !== 0) {
        const url = unit ? `/quiz/${encodeURIComponent(unitToSlug(unit))}` : "/quiz";
        window.location.href = url;
      }
    }, 200);
  };

  return (
    <div>
      {/* ======= HERO SECTION ======= */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-text">
            <h1>
              Master Technical <span className="highlight">Interviews</span>
            </h1>
            <p>
              Prepare for your dream job with comprehensive quizzes on Computer
              Networks, Database Management Systems, and Operating Systems.
            </p>
            <div className="hero-buttons">
              {/* ensure we call the handler without passing event */}
              <button type="button" className="btn-primary" onClick={() => handleStartQuiz()}>
                Start Learning
              </button>
              <button type="button" className="btn-secondary" onClick={() => handleStartQuiz()}>
                View Courses
              </button>
            </div>
            <div className="hero-stats">
              <span>📘 1000+ Questions</span>
              <span>🏆 Expert Curated</span>
              <span>👥 50k+ Students</span>
            </div>
          </div>
          <div className="hero-image">
            <img src={Computer} alt="Learning Illustration" />
          </div>
        </div>
      </section>

      {/* ======= SUBJECTS SECTION ======= */}
      <section className="subjects" id="subjects" ref={subjectsRef}>
        <div className="container">
          <h2>Master Core CS Subjects</h2>
          <p className="subtitle">
            Comprehensive coverage of the most important topics for technical
            interviews
          </p>

          <div className="subject-cards">
            {/* Computer Networks */}
            <div className="card">
              <div className="card-icon">🔗</div>
              <h3>Computer Networks</h3>
              <p>
                Master networking concepts, protocols, and architectures
                essential for technical interviews.
              </p>
              <div className="tags">
                <span>TCP/IP</span>
                <span>OSI Model</span>
                <span>Routing</span>
                <span>Network Security</span>
              </div>
              <div className="card-footer">
                <span>350+ Questions</span>
                <button type="button" className="start-quiz" onClick={() => handleStartQuiz("Computer Networks")}>
                  Start Quiz →
                </button>
              </div>
            </div>

            {/* Database Management */}
            <div className="card">
              <div className="card-icon">🗄️</div>
              <h3>Database Management</h3>
              <p>
                Deep dive into SQL, NoSQL, transactions, and database design
                principles.
              </p>
              <div className="tags">
                <span>SQL Queries</span>
                <span>Normalization</span>
                <span>Indexing</span>
                <span>ACID Properties</span>
              </div>
              <div className="card-footer">
                <span>400+ Questions</span>
                <button type="button" className="start-quiz" onClick={() => handleStartQuiz("Database Management")}>
                  Start Quiz →
                </button>
              </div>
            </div>

            {/* Operating Systems */}
            <div className="card">
              <div className="card-icon">⚙️</div>
              <h3>Operating Systems</h3>
              <p>
                Understand processes, memory management, file systems, and
                system calls and many more.
              </p>
              <div className="tags">
                <span>Process Management</span>
                <span>Memory</span>
                <span>File Systems</span>
                <span>Synchronization</span>
              </div>
              <div className="card-footer">
                <span>300+ Questions</span>
                <button type="button" className="start-quiz" onClick={() => handleStartQuiz("Operating Systems")}>
                  Start Quiz →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
