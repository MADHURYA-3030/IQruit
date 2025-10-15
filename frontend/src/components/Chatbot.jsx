import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import jarvisImg from "../assets/jarvisBot.png";
import "./Chatbot.css";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!question.trim()) return;

    const userMsg = { sender: "user", text: question };
    setChat(prev => [...prev, userMsg]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post("/api/chat", { question });
      const botMsg = { sender: "bot", text: res.data.answer };
      setChat(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setChat(prev => [
        ...prev,
        { sender: "bot", text: "⚠️ Error getting response. Try again later." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-layout">
      {/* Left side – Jarvis Image */}
      <div className="jarvis-side">
        <img
          src={jarvisImg} // update to your actual image path
          alt="Jarvis Bot"
          className="jarvis-img"
        />
        <div className="jarvis-greeting">
          <h2>Hello! I’m <span>Jarvis</span></h2>
          <p>Your personal AI interview preparation assistant.<br />How can I help you today?</p>
        </div>
      </div>

      {/* Right side – Chat Interface */}
      <div className="chatbot-container">
        <h2 className="title">Jarvis — Your AI Assistant</h2>

        <div className="chat-window">
          {chat.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.sender}`}>
              {msg.sender === "bot" ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                <p>{msg.text}</p>
              )}
            </div>
          ))}
          {loading && (
            <div className="chat-msg bot thinking">
              <p>Jarvis is thinking<span className="dots">...</span></p>
            </div>
          )}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about CN, DBMS, or OS..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
