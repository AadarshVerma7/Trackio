import express from "express";
import { loginUser, logoutUser, passwordResetOtp, registerUser, sendVerifiedOtp, userIsAuthenticated, UserResetPassword, verifyEmail } from "../controllers/auth.controllers.js";
import userAuth from "../middlewares/user.middlewares.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(logoutUser);

router.route("/send-verify-otp").post(userAuth,sendVerifiedOtp);

router.route("/verify-account").post(userAuth,verifyEmail);

router.route("/is-auth").get(userAuth,userIsAuthenticated);

router.route("/send-reset-otp").post(passwordResetOtp);

router.route("/reset-password").post(UserResetPassword);

export default router;