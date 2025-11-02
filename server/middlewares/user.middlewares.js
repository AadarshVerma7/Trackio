import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";

const userAuth= asyncHandler(async(req,res,next)=>{

    const {token} =req.cookies;

    if(!token){
        throw new apiError(401,"Not Authorized, Please Login Again !");
    }

    const decodedToken=jwt.verify(token,process.env.JWT_SECRET);

    req.user={
        _id:decodedToken.id,
    };

    next();
});

export default userAuth;