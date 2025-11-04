import userModel from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getUserData = asyncHandler(async(req,res)=>{

    const user = req.user;

    if(!user){
        throw new apiError(404,"User Not Found");
    }

    res.json({
        success:true,
        userData:{
            name:user.name,
            streak:user.streak,
            maxStreak:user.maxStreak,
        }
    })
});

const updateStreak = asyncHandler(async (req,res)=>{
    const user = await userModel.findOne();
    if(!user){
        throw new apiError(404,"User Not Found !");
    }
    const today=new Date();
    const lastActive=user.lastActiveDays? new Date(user.lastActiveDays):null;
    if(!lastActive){
        user.streak=1;
    }
    else{
        const diffDays=Math.floor((today-lastActive)/(1000*60*60*24));
        if(diffDays===1){
            user.streak+=1;
        }
        else if(diffDays>1){
            user.streak=1;
        }   
    }
    if(user.streak>user.maxStreak){
        user.maxStreak=user.streak;
    }
    user.lastActiveDays=today;
    user.streakHistory.push({date:today,active:true});
    await user.save();
    res.json({
        success:true,
        message:"Streak updated",
        data:{
            streak:user.streak,
            maxStreak:user.maxStreak,
            lastActiveDays:user.lastActiveDays,
            streakHistory:user.streakHistory,
        },
    });
});

export {
    getUserData,updateStreak
}