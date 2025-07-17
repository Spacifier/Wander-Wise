import expess from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = expess();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(expess.json({limit: "16kb"}))
app.use(expess.urlencoded({extended: true, limit: "16kb"}))
app.use(expess.static("public"))
app.use(cookieParser())

//router import 


//route declaration


export {app}