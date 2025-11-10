import express from "express";
import multer from "multer";
import { addResource, getResourcesByGroup } from "../controllers/resource.controllers.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/add", verifyJWT, upload.single("file"), addResource);
router.get("/:groupId", verifyJWT, getResourcesByGroup);

export default router;
