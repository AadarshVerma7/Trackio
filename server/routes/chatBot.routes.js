import { Router } from "express";
import { handleChat } from "../controllers/chatBot.controllers.js";

const router = Router();

router.post("/chat",handleChat);

export default router;