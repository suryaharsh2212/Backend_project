import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
import { ApiError } from './apierror.js';

          
cloudinary.config({ 
  cloud_name: 'dllgqcla4', 
  api_key: '251313916117537', 
  api_secret: '8VrQavcjU2zE5ckl5LFVrOe_JX4' 
});

const uploadOncloudinary=async (localfilepath)=>{

  try {
    const response=await cloudinary.uploader.upload(localfilepath);
   if(!response)
   {
    console.log("error in uploaing");
    throw new ApiError(209,"error in uploading")
   }
   fs.unlinkSync(localfilepath);
   return response;
    
  } catch (error) {
    fs.unlinkSync(localfilepath)
    console.log(error);
    return null
    
  }
   
}
export {uploadOncloudinary}