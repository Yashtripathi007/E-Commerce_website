import dotenv from "dotenv";
import connectDB from "./db/index.js"
import mongoose from "mongoose";
import { app } from "./app.js";

dotenv.config({
    path: './env'
})

connectDB()
.then(
    app.listen(process.env.PORT||8000,()=>{
        console.log(`app is listening on : ${process.env.PORT}`);
    })
)
.catch((err)=>{
    console.log("connection error",err);
})