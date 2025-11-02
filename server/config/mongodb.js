import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected Successfully!`);
    } catch (err) {
        console.error("MongoDB Connection Failed:", err);
    }
};

export default connectDB;
