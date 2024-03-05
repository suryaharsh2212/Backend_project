import { Router } from "express";
import {Updatepassword, Updaterefreshtoken, registeruser} from "../controllers/userRegister.js";
import {login} from "../controllers/userRegister.js"; 
import { upload } from "../middlewares/multerFileupload.js";
import { logoutuser } from "../controllers/userRegister.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router=Router()

router.route("/register").post(upload.any(),registeruser) 
// router.route("/register").post(registeruser) 
router.route("/login").post(login)
router.route("/logout").post(verifyJWT,logoutuser)
router.route("/refreshaccessToken").post(verifyJWT, Updaterefreshtoken)
router.route("/updatepassword").post(verifyJWT,Updatepassword)





export {router}