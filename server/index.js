import dotenv from "dotenv";
dotenv.config({
    path:'./.env'
});
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

const port = process.env.PORT || 4000;

const allowedOrigins=['http://localhost:5173']

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server Running at Port : ${port}`);
        });
    })
    .catch((err)=>{
        console.log("MongoDB Connection Failed !",err);
    })

app.use(express.json());

app.use(cookieParser());

app.use(cors({origin:allowedOrigins, credentials: true }));

app.get('/', (req, res) => {
    res.send("API working");
})

//API EndPoints

app.use('/api/auth',authRouter);

app.use('/api/user',userRouter);