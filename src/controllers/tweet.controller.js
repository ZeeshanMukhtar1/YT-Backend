import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tweet } from "../models/tweet.model.js";

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

const getUserTweets = asyncHandler(async (req, res, next) => {});

const deleteTweet = asyncHandler(async (req, res, next) => {});

const updateTweet = asyncHandler(async (req, res, next) => {});

export { createTweet, getUserTweets, deleteTweet, updateTweet };
