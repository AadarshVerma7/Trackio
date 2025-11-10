import express from "express";
import { sendComplaint } from "../controllers/contact.controllers.js";

const router = express.Router();

router.post("/send-complaint",sendComplaint);

export default router;