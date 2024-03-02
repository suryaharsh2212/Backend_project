import mongoose from "mongoose";

const userschema =new mongoose.Schema({
    userid:{
      type:String,
      required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:
    {
        type:String,
        required:true
    }

},{timestamps:true})

export  const User=mongoose.model("User",userschema)