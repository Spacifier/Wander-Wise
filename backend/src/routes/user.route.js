import {Router} from "express";
import { changeCurrentPassword, getAllUsers, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateAvatarImage } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//secure routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/avatar").post(verifyJWT,upload.single("avatar"),updateAvatarImage)
router.route("/all-users").get(verifyJWT,getAllUsers)

export default router