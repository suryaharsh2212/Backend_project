import { User } from "../Models/usermodel.js";
import { ApiError } from "../utility/apierror.js";
import asyncHandler from "../utility/asyncHandler.js";
import jwt from "jsonwebtoken"
export const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        const token=req.cookies?.accesstoken|| req.header("Authorization")?.replace("Bearer ","")
        if(!token)
        {
            res.status(401).json({
                message:"Unauthorized request"
            })
            throw new ApiError(401,"unauthorized request")
            
        }
        const decodeinfo=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user=await User.findById(decodeinfo?._id).select("-password")
        if(!user)
        {
            throw new ApiError(401,"invalid access token")
        }
        req.user=user
       
        next()
    } catch (error) {
        console.log(error);
    }
})


