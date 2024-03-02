 

 const asyncHandler=(asyncrequest)=> (req,res,next)=>{
      Promise.resolve(asyncHandler(req,res,next)).catch((err)=> next(err))
 }
 export default asyncHandler