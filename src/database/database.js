import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connect_db=async()=>{
    try {
        const connection=await mongoose.connect(`${process.env.MONGO_DB}/${DB_NAME}`)
        console.log(`\n mongo db connected ...${connection.connection.host}`);
    } catch (error) {
        console.log("error occured",err);
    }
}
export default connect_db;