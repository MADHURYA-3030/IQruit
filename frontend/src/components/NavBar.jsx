import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">iQruit</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/quiz">Quiz</a></li>
        <li><a href="/profile">Profile</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;