import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    groupName:{
        type:String,
        required:true,
        trim:true,
    },
    topic:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    todoList:[
        {
            task:{type:String},
            completed:{type:Boolean,default:false},
        },
    ],
    groupId:{
        type:String,
        unique:true,
        required:true,
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],
},{timestamps:true});

const groupModel = mongoose.model("Group",groupSchema);

export default groupModel;