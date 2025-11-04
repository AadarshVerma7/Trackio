import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    password:{
        type:String,
        required:true,
    },
    verifyOtp:{
        type:String,
        default:'',
    },
    verifyOtpExpireAt:{
        type:Number,
        default:0,
    },
    isAccountVerified:{
        type:Boolean,
        default:false,
    },
    resetOtp:{
        type:String,
        default:'',
    },
    resetOtpExpireAt:{
        type:Number,
        default:0,
    },
    streak:{
        type:Number,
        default:0,
    },
    maxStreak:{
        type:Number,
        default:0,
    },
    lastActiveDays:{
        type:Date,
    },
    streakHistory:[
        {
            date:{type:Date,required:true},
            active:{type:Boolean,default:true},
        },
    ],
},{timestamps:true});

const UserModel=mongoose.models.user || mongoose.model('User',UserSchema);

export default UserModel;