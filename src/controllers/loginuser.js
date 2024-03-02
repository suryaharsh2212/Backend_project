
const login=(req,res)=>{
    const {userid,password}=req.body;
    console.log(userid);
    console.log(password);
    res.status(200).json({
        message:"value received"
    })
}



export default login