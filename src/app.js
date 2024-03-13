import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()

app.use(cors({origin: process.env.CORS_ORIGIN}
             ,{credentials :true},)) 

// this middleware is a cross origin resource sharing which allows resouce sharing with the url we want 
// it has a origin :which specify where to talk to share resouce.
app.use(express.json({limit: "1mb"})) // this middleware is accepting and json data with a 20kb size
app.use(express.urlencoded({extended:false})) //this middleware is used as data coming from url can be encoded as ex- space is treated as %20 so as to detect it we use this middleware
app.use(express.static("public")) // this middleware is used as to serve the file temporay in our server public which is a folder name where we want to keep
app.use(cookieParser())




import { router } from "./Routes/routes.js"

app.use("/api/v1/user",router)





export default app;