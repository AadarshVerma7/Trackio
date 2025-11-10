import groupModel from "../models/group.models.js";
import {v4 as uuidv4} from "uuid";
import { asyncHandler } from "../utils/asyncHandler.js";
import UserModel from "../models/user.models.js";
import { Task } from "../models/task.models.js";

const createGroup = asyncHandler(async(req,res)=>{
    const {groupName,topic,description,todoList} = req.body;
    const userId = req.user._id;

    if(!groupName || !topic || !description){
        return res
        .status(400)
        .json({
            success:false,
            message:"All fields Required",
        })
    }

    const newGroup = await groupModel.create({
        groupName,
        topic,
        description,
        todoList,
        groupId:uuidv4().slice(0,8),
        admin:userId,
        members:[userId],
    });

    res.status(201).json({
        success:true,
        message:"Group created Successfully !",
        group:newGroup,
    });
});

const joinGroup = asyncHandler(async(req,res)=>{
    const {groupName,groupId} = req.body;
    const userId = req.user._id;

    const group = await groupModel.findOne({groupName,groupId});
    if(!group){
        return res.status(404).json({success:false,message:"Group not Found !"});
    }

    if(group.members.includes(userId)){
        return res.status(400).json({success:false,message:"Already joined this Group !"});
    }

    group.members.push(userId);
    await group.save();

    res.status(200)
    .json({
        success:true,
        message:"Joined Group Successfully !",
        group,
    });
});

const getUserGroups = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const groups = await groupModel.find({members:userId});
    const formattedGroups = groups.map(group=>({
        ...group.toObject(),
        admin:group.admin.toString(),
        members:group.members.map(m=>m.toString()),
    }));
    res.status(200).json({success:true,groups:formattedGroups});
});

const leaveGroup = asyncHandler(async(req,res)=>{
    const {groupId} = req.body;
    const userId = req.user._id;

    if(!groupId){
        return res.status(400).json({
            success:false,
            message:"Group ID is required",
        });
    }

    const group = await groupModel.findOne({groupId});
    if(!group){
        return res.status(404).json({
            success:false,
            message:"Group not Found !",
        });
    }

    if(group.admin.toString() === userId.toString()){
        return res.status(403).json({
            success:false,
            message:"Admin cannot leave their own group",
        });
    }

    group.members = group.members.filter(
        (memberId) => memberId.toString() !==userId.toString()
    );

    await group.save();

    return res.status(200).json({
        success:true,
        message:"You have left the group successfully",
    })
});

export {createGroup,joinGroup,getUserGroups,leaveGroup};