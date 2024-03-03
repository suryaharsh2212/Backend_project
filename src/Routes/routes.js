import { Router } from "express";
import {registeruser} from "../controllers/userRegister.js";
import {login} from "../controllers/userRegister.js"; 
import { upload } from "../middlewares/multerFileupload.js";
import { logoutuser } from "../controllers/userRegister.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router=Router()

router.route("/register").post(upload.any(),registeruser)
router.route("/login").post(login)
router.route("/logout").post(verifyJWT,logoutuser)





export {router}