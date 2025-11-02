import userModel from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getUserData = asyncHandler(async(req,res)=>{

    const userId = req.user?._id;
    const user = await userModel.findById(userId);

    if(!user){
        throw new apiError(404,"User Not Found");
    }

    res.json({
        success:true,
        userData:{
            name:user.name,
            isAccountVerified:user.isAccountVerified,
        }
    })
});

export {
    getUserData,
}