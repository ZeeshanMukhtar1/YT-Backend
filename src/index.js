import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
}); // Loading  environment variables from .env file
import express from "express";
const app = express();
import connectDB from "./db/index.js";
connectDB();
