import express from "express";
import { getUserData,updateStreak } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router=express.Router();

router.get("/getUserData",verifyJWT,getUserData);
router.post("/updateStreak",verifyJWT,updateStreak);

export default router;