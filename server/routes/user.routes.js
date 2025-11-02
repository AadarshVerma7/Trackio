import express from "express";
import { getUserData } from "../controllers/user.controllers.js";
import userAuth from "../middlewares/user.middlewares.js";

const router=express.Router();

router.route("/profile").get(userAuth,getUserData);

export default router;