import React from "react";
import { useNavigate } from "react-router-dom";
import Computer from "../assets/Computer.png";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleStartQuiz = () => {
    if (!token) {
      navigate("/login");
    } else {
      alert("✅ Quiz started! (replace with quiz page navigation)");
    }
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
              <button className="btn-primary" onClick={handleStartQuiz}>
                Start Learning
              </button>
              <button className="btn-secondary" onClick={handleStartQuiz}>
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
      <section className="subjects">
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
                <button className="start-quiz" onClick={handleStartQuiz}>
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
                <button className="start-quiz" onClick={handleStartQuiz}>
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
                system calls.
              </p>
              <div className="tags">
                <span>Process Management</span>
                <span>Memory</span>
                <span>File Systems</span>
                <span>Synchronization</span>
              </div>
              <div className="card-footer">
                <span>300+ Questions</span>
                <button className="start-quiz" onClick={handleStartQuiz}>
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
