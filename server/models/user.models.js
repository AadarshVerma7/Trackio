import mongoose from "mongoose";

const profilePicSchema = new mongoose.Schema(
    {
        url:{
            type:String,
            default:"",
        },
        publicId:{
            type:String,
            default:"",
        },
    },
    {_id:false}
);

const streakSchema = new mongoose.Schema(
    {
        currentCount:{
            type:Number,
            default:0,
        },
        startDate:{
            type:Date,
            default:null,
        },
        lastLoginDate:{
            type:Date,
            default:null,
        },
    },
    {_id:false}
);

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    verifyOtp:{
        type:String,
        default:"",
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
        default:"",
    },
    resetOtpExpireAt:{
        type:Number,
        default:0,
    },
    phone:{
        type:String,
        default:"",
        trim:true,
    },
    address:{
        type:String,
        default:"",
        trim:true,
    },
    profilePic:{
        type:profilePicSchema,
        default:()=>({}),
    },
    streak:{
        type:streakSchema,
        default:()=>({}),
    },
    progress:{
        type:Number,
        default:0,
        min:0,
        max:100,
    }
},{timestamps:true});

const UserModel = mongoose.models.User || mongoose.model("User",UserSchema);

export default UserModel;