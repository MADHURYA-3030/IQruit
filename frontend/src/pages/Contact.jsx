// src/pages/Contact.jsx
import React from "react";
import "./Contact.css"; // for styling

const contributors = [
  {
    name: "Nikhitha Ram",
    linkedIn: "https://www.linkedin.com/in/nikhitha-ram-talla-6955342ba", // your real LinkedIn URL
  },
  {
    name: "Madhurya",
    linkedIn: "https://www.linkedin.com/in/durga-madhurya-gunupudi-b3aab1318/",
  },
  {
    name: "Lasya Priya",
    linkedIn: "https://www.linkedin.com/in/lasya-priya-madala-3493b1290/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name:"Anusha",
    linkedIn:"https://www.linkedin.com/in/anusha-kommula-313068338",
  },
  {
    name:"Manvitha",
    linkedIn:"https://www.linkedin.com/in/manvitha-sree-jaldani-78b6b9296/",
  },
  {
    name:"Deekshitha",
    linkedIn:"https://www.linkedin.com/in/deekshitha-kammela-8395b8290/",
  },
  {
    name:"Akanksha",
    linkedIn:"https://www.linkedin.com/in/akankshasai-nimmagadda-b997452b7/",
  }

];

const Contact = () => {
  return (
    <div className="contact-page">
      <h1>Meet Our Contributors 💻</h1>
      <p className="contact-subtitle">
        The dedicated team behind <strong>IQruit</strong>
      </p>

      <div className="contributors-grid">
        {contributors.map((person, index) => (
          <div key={index} className="contributor-card">
            <h3>{person.name}</h3>
            <p>{person.role}</p>

            {/* Use LinkedIn link safely */}
            {person.linkedIn ? (
              <a
                href={person.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                🔗 LinkedIn Profile
              </a>
            ) : (
              <span className="no-link">No LinkedIn available</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
