import { verifyJwt } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import {
  createTweet,
  deleteTweet,
  getUserTweets,
  updateTweet,
} from "../controllers/tweet.controller.js";

const router = Router();

router.use(verifyJwt); // it will Apply verifyJWT middleware to all routes in this file
// routes paths
router.route("/").post(createTweet);
router.route("/user/:userId").get(getUserTweets);
// router.route("/:tweetid").patch(updateTweet);

export default router;
