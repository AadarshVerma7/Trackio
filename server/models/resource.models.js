import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
        required:true,
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    link:{
        type:String,
        required:true,
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    description:{
        type:String,
    },
    fileUrl:{
        type:String,
        required:true,
    },
    fileType:{
        type:String,
        default:"pdf",
    }
},{timestamps:true});

export const Resource = mongoose.model("Resource",resourceSchema);