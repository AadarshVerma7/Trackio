import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";
import User from "../models/user.models.js";

export const verifyJWT =  async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new apiError(401, "Unauthorized - No Token Provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user=await User.findById(decoded.id).select("-password");

    if(!user){
      return res.status(404).json({success:false,message:"User Not Found"});
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Failed:", error.message);
    next(new apiError(401, "Unauthorized - Invalid or Expired Token"));
  }
};
