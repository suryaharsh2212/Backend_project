import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userschema =new mongoose.Schema({
    userid:{
      type:String,
      required:true,
      unique:true,
      index:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profile:
    {
        type:String,
        required:true
    },
    token:{
        type:String
    }

},{timestamps:true})

userschema.pre("save",async function (next){  //its a middleware used just before saving the the passwod to encrpt the password
     if(!this.isModified("password")) return next() ;
     this.password= await bcrypt.hash(this.password,8)

    
})

// userschema.methods.ispasswordcorrect=async function(password){
//     console.log("Provided Password:", password);
//     console.log("Stored Password:", this.password);
//     return await bcrypt.compare(password,this.password)
// }
userschema.methods.ispasswordcorrect = async function (password) {
    if (!this.password || !password) {
      console.error("Password or stored password is undefined/null");
      return false;
    }
  
    console.log("Provided Password:", password);
    console.log("Stored Password:", this.password);
  
    return await bcrypt.compare(password, this.password);
  };
  
userschema.methods.generateaccessToken= function(){
    return  jwt.sign(
        {
            _id:this._id,
            profile:this.profile,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:ACCESS_TOKEN_EXPIRY
        }
    )
     
}
userschema.methods.generaterefreshToken= function(){
    return  jwt.sign(
        {
            _id:this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {

           expiresIn:REFRESH_TOKEN_EXPIRY
        }
    )
     
}



export  const User=mongoose.model("User",userschema)