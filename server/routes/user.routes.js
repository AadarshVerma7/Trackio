import express from "express";
import { getUserData,updateStreak,updateUserProfile } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { upload } from "../middlewares/multer.middlewares.js"

const router=express.Router();

router.get("/getUserData",verifyJWT,getUserData);
router.post("/updateStreak",verifyJWT,updateStreak);
router.put("/update-profile",verifyJWT,upload.single("profilePic"),updateUserProfile);

export default router;