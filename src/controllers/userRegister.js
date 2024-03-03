import { uploadOncloudinary } from "../utility/cloudinary.js"
import apiresponse from "../utility/apiresponse.js"
import { ApiError } from "../utility/apierror.js"
import {User} from "../Models/usermodel.js"
import ApiResponse from "../utility/apiresponse.js"
import asyncHandler from "../utility/asyncHandler.js"

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
      return responseofcoludinary
    

    
})

const login=asyncHandler( async (req, res) => {
  const { userid, password } = req.body;
  console.log(typeof(userid));  
  try {
      const user = await User.findOne({$or:[{userid}]});
      console.log(userid);

      if (user) {
          const isPassValid = await user.ispasswordcorrect(password);

          if (isPassValid) {
              res.status(202).json({
                  message: "Login successfully",
                  user: {
                      userid:userid,
                      email:user.email
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
}

)



export {login,
 

registeruser
}
  


 