import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  quizResults: [{
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }]
});

const User = mongoose.model("User", userSchema);
export default User;
