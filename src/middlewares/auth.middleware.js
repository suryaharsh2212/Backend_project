import { User } from "../Models/usermodel.js";
import { ApiError } from "../utility/apierror.js";
import asyncHandler from "../utility/asyncHandler.js";
import jwt from "jsonwebtoken"
export const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        const token=req.cookies?.accesstoken|| req.header("Authorization")?.replace("Bearer ","")
        if(!token)
        {
            // alert("You are not loggged In")
            res.status(401).json({
                message:"Unauthorized request cookie "
            })
            throw new ApiError(401,"unauthorized request")
            
        }
        const decodeinfo=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        console.log(decodeinfo);
        const user=await User.findById(decodeinfo?._id)
        if(!user)
        {
            throw new ApiError(401,"invalid access token")
        }
        req.user=user;
        // console.log(req.user); 
       
        next()
    } catch (error) {
        console.log(error);
    }
})


