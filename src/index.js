import mongoose from "mongoose";
import express from "express";
import { DB_NAME } from "./constants.js";
const app = express();
import dotenv from "dotenv";
dotenv.config(); // Loading  environment variables from .env file

// Always use try catch catch to handle with databse , because it is async operation and it can fail anytime

//  first basic approach to connect to database
// function connectDB() {}
// connectDB();

// second approach to connect to database using IIFE (Immediately Invoked Function Expression)
// ;(async () => {})();
//   we will start from  semecolon bacause if it foe cleaning purpose and if any person forget to put semecolon before this code then it will not give error
// its better to use semecolon before this code

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    //  the keyword await is most important to use because it will wait for the database to connect and then it will move forward
    app.on("error", (error) => {
      console.error("error in starting server", error.message);
      throw new Error(error);
    });

    app.listen(process.env.PORT, () => {
      console.log(`app is listening ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("error in connecting to database", error.message);
    throw new Error(error);
  }
})();
