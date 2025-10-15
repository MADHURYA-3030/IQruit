import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini AI client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export const askGemini = async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Question is required" });

  const prompt = `
You are Jarvis — an intelligent interview assistant for IQruit.
You help students with CN, DBMS, and OS topics.

If someone asks "Tell me about this website" or "What is IQruit", answer:
"IQruit is an interview preparation platform helping students strengthen core CS subjects like CN, DBMS, and OS with quizzes and AI guidance."

Otherwise, give detailed and structured answers.
User: ${question}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    // Extract text from the correct path
    const answer = response.candidates?.[0]?.content?.parts?.[0]?.text || 
                   "Sorry, I couldn't find an answer.";

    console.log("Answer:", answer);
    res.json({ answer });

  } catch (err) {
    console.error("Gemini API Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get response from Gemini API" });
  }
};


