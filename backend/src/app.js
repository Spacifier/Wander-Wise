import dotenv from 'dotenv';
dotenv.config(); 
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from './middlewares/error.middleware.js';

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//router import 
import userRouter from './routes/user.route.js';
import tripRouter from './routes/trip.route.js';
import dashboardRouter from './routes/dashboard.route.js';

//route declaration
app.use("/api/v1/users",userRouter);
app.use("/api/v1/trips",tripRouter);
app.use("/api/v1/dashboard",dashboardRouter);

//error handeling
app.use(errorHandler);

export {app}