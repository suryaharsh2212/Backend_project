import { uploadOncloudinary } from "../utility/cloudinary.js"
import apiresponse from "../utility/apiresponse.js"
import { ApiError } from "../utility/apierror.js"
import {User} from "../Models/usermodel.js"
import ApiResponse from "../utility/apiresponse.js"
import asyncHandler from "../utility/asyncHandler.js"
// import { verify } from "jsonwebtoken" 
import jwt from "jsonwebtoken"


const generateaccessandrefreshtoken=async(userID)=>{
    try {
      const user =await User.findById(userID)
      
      const accessToken= user.generateaccessToken()
      const refreshToken= user.generaterefreshToken()
      user.token=refreshToken
      await user.save({validateBeforeSave:false})
      return {accessToken,refreshToken}
      
    } catch (error) {
      console.log(error);
      throw new ApiError(500,"something went wrong while gerating token")
    }
}


const registeruser=asyncHandler(async (req,res)=>{
    
  const {userid,password,email}=req.body
    if([userid,password,email].some((field)=>field?.trim()==="" ))
   { 
    res.status(202).json({
      message:"Fields are required ",
    })
      throw new ApiError(209,"fields are required")
   }
   const Userexist=await User.findOne({$or:[{userid},{email}]})
    if(Userexist)
    {
      res.status(202).json({
        message:"User already exist",
        user:{
           userid,
           email
        }
      })
      throw new ApiResponse(209, {userid,email}, "User with userid or email already exists");
      
    }
    
   
      const responseofcoludinary=await uploadOncloudinary(req.files[0].path)
      console.log("Image uploaded on cloudinary",responseofcoludinary.url)
      if(responseofcoludinary==null) return new ApiError(209,"error ocuured during uploading")
      res.status(200).json({
        message:"Registered sucessfully",
        url:responseofcoludinary.url,
        userid:userid,
        email:email,
    })
    User.create({
      userid,
      password,
     profile:responseofcoludinary.url, 
      email
    })
      // return responseofcoludinary 
    

    
})

const login=asyncHandler( async (req, res) => {
  const { userid, password } = req.body;
  try {
      const user = await User.findOne({$or:[{userid}]});

      if (user) {
          
        const isPassValid = await user.ispasswordcorrect(password);
          if (isPassValid) {
            
            const {accessToken,refreshToken}=await generateaccessandrefreshtoken(user._id)
            const options={
              httpOnly:true,
              secure:true
            }
             return res.status(202)
             .cookie("accesstoken",accessToken,options)
             .cookie("refreshtoken",refreshToken,options)
             .json({
                  message: "Login successfully",
                  user: {
                      userid:userid,
                      email:user.email,
                      accessToken,
                      refreshToken
                      
                  },
              });
          } else {
              res.status(202).json({
                  message: "Invalid userid or password",
              });
              throw new ApiError(202, "", "Invalid details");
          }
      } else {
          res.status(202).json({
              message: "Invalid userid or password",
          });
          throw new ApiError(202, "", "Invalid details");
      }
  } catch (error) {
      console.log(error);
    
  }
})
const logoutuser=asyncHandler(async(req,res)=>{
     
    const a=await User.findById(req.user._id)
    a.token=undefined
    await a.save({validateBeforeSave:false})
    

     const options={
      httpOnly:true,
      secure:true
    }
    return res
    .status(200)
    .clearCookie("accesstoken",options)
    .clearCookie("refreshtoken",options)
    .json(
      new ApiResponse(200,{},"Logged out successfully")
    )
})

const Updaterefreshtoken=asyncHandler(async(req,res)=>{
     const Incominrefreshtoken=req.cookies.refreshtoken
     if(!Incominrefreshtoken)
     {
      res.status(400).json({
        message:"Unauthorized request"
      })
     }
      
     const decodedToken=jwt.verify(Incominrefreshtoken,process.env.REFRESH_TOKEN_SECRET)
 
     const IncominUser=await User.findById(decodedToken._id)
     const newToken=await generateaccessandrefreshtoken(IncominUser._id)
     
     const newAccessToken=newToken.accessToken
     const newRefreshToken=newToken.refreshToken
    

     IncominUser.token=newToken.refreshToken
     await IncominUser.save({validateBeforeSave:false})
     const options={
      httpOnly:true,
      secure:true
    }

     res.status(200).
     cookie("accesstoken",newAccessToken,options)
      .cookie("refreshtoken",newRefreshToken,options)
      .json({
        message:"token refreshed sucessfully",
        newTokens:{
          Access:newAccessToken,
          Refresh:newRefreshToken
        }


      })


     
     
})
const Updatepassword=asyncHandler(async(req,res)=>{
      const prev=req.body.previouspassword
      const newpass=req.body.newpassword
      const Checkpassword=await req.user.ispasswordcorrect(prev)
      if(!(prev && newpass))
      {
        res.status(401).json({
          message:"please enter the required fields"
        })
      }
      console.log(Checkpassword);
      if(!Checkpassword)
      {
        res.status(401).json({
          message:"previous password is incorrect"
        }) 
      }
       if (Checkpassword) {
          const changes=await User.findById(req.user._id)
          changes.password=newpass
          changes.save()
          res.status(200).json({
            message:"password updated sucessfully"
          })
       }


})


export {login,
 logoutuser,
 Updaterefreshtoken,
  Updatepassword,
 

registeruser
}
  


 