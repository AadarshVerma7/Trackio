import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath, folder = "general") => {
  try {
    if (!localFilePath || !fs.existsSync(localFilePath)) {
      throw new Error("Local File path is invalid or does not exist!");
    }
    const fileExtension = path.extname(localFilePath).toLowerCase();

    const isImage = [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(fileExtension);
    const isPDF = fileExtension === ".pdf";

    const options = {
      folder,
      resource_type: isImage ? "image" : "raw",
      ...(isImage ? {} : { format: "pdf" }) 
    };

    const result = await cloudinary.uploader.upload(localFilePath, options);
    fs.unlinkSync(localFilePath);
    return result;
  } catch (error) {
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    console.error("Cloudinary upload failed:", error);
    throw new Error(error.message || "Cloudinary upload failed");
  }
};
