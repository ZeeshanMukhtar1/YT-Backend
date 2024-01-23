import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required!"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "email is required!"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: [true, "fullname is required!"],
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: [true, "avatar is required!"],
    },
    coverImage: {
      type: String, // cloudinary url
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "password is required!"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// using the pre hook (provided by mongoose) to encrypt the password before saving it to the database
//  1st approch with negative check
// getting rid of problem of rehashing the password when the user updates the other fields whci can use computatinal power
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//  2nd approch with positive check
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// comparing the user given password with then encrypted  password in the database
userSchema.methods.isPasswordcorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
  // it will return true or false
};

// generating the jwt token
userSchema.methods().generateAccessToken = function () {
  return Jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    fullName: this.fullName,
  });
  process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCEESS_TOKEN_EXPIRY,
    };
};
userSchema.methods().generateRefreshToken = function () {
  return Jwt.sign({
    _id: this._id,
  });
  process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    };
};

export default mongoose.model("User", userSchema);
