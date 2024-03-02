import asyncHandler from "../utility/asyncHandler.js"
import { uploadOncloudinary } from "../utility/cloudinary.js"
import apiresponse from "../utility/apiresponse.js"
import { ApiError } from "../utility/apierror.js"
import {User} from "../Models/usermodel.js"

// const registeruser=asyncHandler((req,res)=>{
//       res.status(200).json({
//         message:"api ready"
//       })
      
// })
const registeruser=async (req,res)=>{
    
    const {userid,password}=req.body
    console.log(userid)
    console.log(password);
    const filedata=req.files
    console.log(req.files)
    console.log(req.files[0].path)
   const responseofcoludinary=await uploadOncloudinary(req.files[0].path)
   console.log(responseofcoludinary.url)
   res.status(200).json({
    message:"ok",
    url:responseofcoludinary.url
})
const usercreated=await  User.create({
    userid,
    password,
    profile:responseofcoludinary.url
  })


  
  
 
  
    
}
 

export default registeruser
  


 