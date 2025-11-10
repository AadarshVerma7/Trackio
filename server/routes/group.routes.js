import express from "express";
import { createGroup,getUserGroups,joinGroup, leaveGroup } from "../controllers/group.controllers.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import groupModel from "../models/group.models.js";

const router = express.Router();

router.post("/create",verifyJWT,createGroup);
router.post("/join",verifyJWT,joinGroup);

router.get("/my-groups",verifyJWT,getUserGroups);

router.get("/my-groups/:groupId",verifyJWT,asyncHandler(async(req,res)=>{
    const {groupId} = req.params;
    const group = await groupModel
    .findOne({groupId})
    .populate("members","name email")
    .populate("admin","name email");

    if(!group){
        return res.status(404).json({success:false,message:"Group not Found"});
    }

    res.status(200).json({success:true,group});
}));

router.post("/leave",verifyJWT,leaveGroup);

export default router;