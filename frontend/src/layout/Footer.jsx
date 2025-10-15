// src/layout/Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3>IQruit</h3>
          <p>Connecting talent with opportunities</p>
        </div>
        <div className="footer-center">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-right">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://github.com/MADHURYA-3030/IQruit" target="_blank" rel="noopener noreferrer">Github</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} IQruit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
