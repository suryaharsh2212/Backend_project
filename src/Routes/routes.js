import { Router } from "express";
import registeruser from "../controllers/userRegister.js";
import login from "../controllers/loginuser.js"; 
import { upload } from "../middlewares/multerFileupload.js";


const router=Router()

router.route("/register").post(upload.any(),registeruser)
router.route("/login")
.post(login)



export {router}