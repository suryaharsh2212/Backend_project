import { v2 as cloudinary } from 'cloudinary'

          
cloudinary.config({ 
  cloud_name: 'dllgqcla4', 
  api_key: '251313916117537', 
  api_secret: '8VrQavcjU2zE5ckl5LFVrOe_JX4' 
});

const uploadOncloudinary=async (localfilepath)=>{
   const response=await cloudinary.uploader.upload(localfilepath);
   if(!response)
   {
    console.log("error in uploaing");
   }
   return response;
}
export {uploadOncloudinary}