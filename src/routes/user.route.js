import { Router } from "express";
import {
  chnageCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updatecoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controllers/user.controller.js";

const router = Router();
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secure routes
// router.route("/logout").post(logoutUser);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/change-password").post(verifyJwt, chnageCurrentPassword);
router.route("/getCurrentUser").get(verifyJwt, getCurrentUser);
router.route("/refresh-token").post(verifyJwt, refreshAccessToken);
// router.route("/updateAccountDetails").post(verifyJwt, updateAccountDetails);
// router.route("/updatecoverImage").post(verifyJwt, updatecoverImage);
// router.route("/updateUserAvatar").post(verifyJwt, updateUserAvatar);

export default router;
