import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  // Always use try catch catch to handle with databse , because it is async operation and it can fail anytime
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`connected to database ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MongoDb connection failed", error.message);
    process.exit(1); // 1 means exit with failure
  }
};

export default connectDB;
