import React from 'react';
import "./HomePage.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div className="app-container">
      <NavBar />
      <main className="homepage-container">
        <h1>Welcome to iQruit</h1>
        <p>A fun and engaging quiz application to test your knowledge.</p>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
