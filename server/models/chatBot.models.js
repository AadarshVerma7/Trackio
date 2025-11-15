import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    messages:[
        {
            sender:{
                type:String,
                enum:["user","bot"],
                required:true,
            },
            text:{
                type:String,
                required:true,
            },
            time:{
                type:Date,
                default:Date.now,
            },
        }
    ]
},{timestamps:true});

export const ChatModel = mongoose.model("Chat",chatSchema);