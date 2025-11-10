import express from "express";
import {markTaskComplete,getUserProgress,createTask,getGroupTasks,getGroupProgress,getUserTasks} from "../controllers/task.controllers.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = express.Router();

router.post("/complete",verifyJWT,markTaskComplete);

router.get("/progress/:groupId",verifyJWT,getUserProgress);

router.post("/",verifyJWT,createTask);

router.get("/:groupId",verifyJWT,getGroupTasks);

router.get("/group/:groupId/progress",verifyJWT,getGroupProgress);

router.get("/user/:groupId", verifyJWT, getUserTasks);

export default router;