import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
});
import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath || !fs.existsSync(localFilePath)){
            throw new Error("Local File path is invalid or does not exist!");
        }
        const result = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        });

        fs.unlinkSync(localFilePath);
        return result;
    } catch (error) {
        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
        console.error("Cloudinary upload failed:", error);
        throw new apiError(500, error.message || "Cloudinary upload failed");
    }
};