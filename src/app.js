import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()

app.use(cors({origin: process.env.CORS_ORIGIN}))
export default app;
app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(express.cookieParser())