import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const createTweet = asyncHandler(async (req, res, next) => {
  try {
    const { content } = req.body;
    const userid = req.user._id;
    if (!content) throw new ApiError(400, "please provide tweet content");
    if (!userid) throw new ApiError(400, "user not found");

    const tweet = await Tweet.create({ content, owner: userid });
    if (!tweet) throw new ApiError(500, "operation failed , tweet not created");

    res
      .status(201)
      .json(new ApiResponse(201, { tweet }, "tweet created successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      error.message
        ? error.message
        : "operation failed , there is an error while creating tweet "
    );
  }
});

const getUserTweets = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId)
      throw new ApiError(401, "You do not have permission to Read Tweets");

    const allTweets = await Tweet.find({
      owner: new mongoose.Types.ObjectId(userId),
    });

    if (!allTweets || allTweets.length === 0) {
      throw new ApiError(404, "No tweets found for this user");
    }

    const tweets = allTweets.map((tweet) => {
      return {
        tweet: tweet.content,
        tweetId: tweet._id,
        owner: tweet.owner,
      };
    });

    return res.status(200).json(new ApiResponse(200, { tweets }, "Success"));
  } catch (e) {
    throw new ApiError(400, e.message || "Some error occurred getting tweets");
  }
});

const deleteTweet = asyncHandler(async (req, res, next) => {
  try {
  } catch (error) {}
});

const updateTweet = asyncHandler(async (req, res, next) => {
  try {
    const { content } = req.body;
    const userid = req.user._id;
    if (!content)
      throw new ApiError(400, "please provide tweet content to update");
    if (!userid) throw new ApiError(400, "user not found");

    const updatedTweet = await Tweet.findOneAndUpdate(
      { _id: req.params.tweetId, owner: userid },
      { content },
      { new: true }
    );

    if (!updatedTweet) throw new ApiError(404, "tweet not found");

    res
      .status(200)
      .json(
        new ApiResponse(200, { updatedTweet }, "tweet updated successfully")
      );
  } catch (error) {
    throw new ApiError(500, error.message || " update operation failed");
  }
});

export { createTweet, getUserTweets, deleteTweet, updateTweet };
