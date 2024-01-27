import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// custom method for generating access token and refresh token
const generateAccessTokenAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = user.generateAccessToken();
  refreshToken = user.generateRefreshToken();
  // saving the refresh token in the database
  user.refreshToken = refreshToken; // injecting the value of refresh token in the user object
  await user.save({ validateBeforeSave: false });
  // we will give both the tokens to the user
  return { accessToken, refreshToken };
  try {
  } catch (error) {
    throw new ApiError(500, "Token generation failed");
  }
};

// register user
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  // if data is coming from form or json we will extract it from req.body
  const { fullName, email, username, password } = req.body;

  // 2nd approach checking all fields at once
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // check if user already exists - by email or username
  const existedUser = await User.findOne({
    $or: [
      {
        username,
      },
      {
        email,
      },
    ],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // check for images, check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  // check for avatar validation
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  // uploading them to cloudinary, avatar and coverImage
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // double check for avatar successful upload
  if (!avatar) {
    throw new ApiError(400, "Avatar file is a required field");
  }

  // object creation in actual db with all given fields
  const user = await User.create({
    fullName,
    email,
    username: username.toLowerCase(),
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  // double check for user creation
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "User creation failed");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

// login user method
// Access token are short lived and refresh token are long lived
const loginUser = asyncHandler(async (req, res) => {
  // login user algorithm
  // get crendentials from req.body (email or usernam)
  // find that user
  // check password of that user
  // if password is correct then generate access token and refresh token
  // send cookies to the user

  const { email, password } = req.body;
  if (!email || !username) {
    throw new ApiError(400, "Email or username are required");
  }

  // finding user by email or username programatically
  const user = await User.findOne([
    {
      $or: [{ email }, { username }],
    },
  ]);

  // checking for user existence
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // check for password if user found successfully
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // getting access token and refresh token by calling the custom method
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  // sending the cookies to the user
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // updating cokies policy so that user cant modifie the cookies (only server can edit it)

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  // algorithm
  // get refresh token from req.cookies
  // find user by refresh token
  // if user found then remove refresh token from db
  // send response
  // clear cookies from the browser
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToke: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});
export { registerUser, loginUser, logoutUser };
