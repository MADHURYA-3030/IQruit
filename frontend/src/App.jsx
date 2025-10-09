import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./layout/Header";
import LandingPage from "./components/LandingPage";
import QuizPage from "./pages/QuizPage";
import QuizResult from "./pages/QuizResult";
import QuizReview from "./pages/QuizReview";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import SignupPage from "./components/SignupPage"; // changed to use components/SignupPage
import ComputerNetworks from "./pages/ComputerNetworks";
import OperatingSystems from "./pages/Operating Systems";
import Dbms from "./pages/Dbms";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ paddingTop: 16 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz/:subject" element={<QuizPage />} />
          <Route path="/quiz/:subject/:unit" element={<QuizPage />} />
          <Route path="/quiz/result" element={<QuizResult />} />
          <Route path="/quiz/review" element={<QuizReview />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ComputerNetworks" element={<ComputerNetworks />}/>
          <Route path="/OperatingSystems" element={<OperatingSystems />}/>
          <Route path="/Dbms" element={<Dbms />}/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;