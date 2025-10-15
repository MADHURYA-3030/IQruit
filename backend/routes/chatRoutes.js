import express from "express";
import { askGemini } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", askGemini);

export default router;
