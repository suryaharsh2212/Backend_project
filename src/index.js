// require('dotenv').config({path: './env'})
import dotenv from "dotenv"

dotenv.config({
    path:"./env"
})

import connect_db from "./database/database.js"

connect_db();









































// import express from "express"
// const app=express()
// (async()=>{
//     try {
//         const connect=await mongoose.connect(`${process.env.MONGO_DB}/${DB_NAME}`)
//         app.on("error",()=>{
//             console.log("errrrr");
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`app listening on port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.log("error occured",error);
//         throw error;
//     }
// })()