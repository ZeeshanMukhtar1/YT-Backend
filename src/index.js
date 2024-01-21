import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
}); // Loading  environment variables from .env file

connectDB()
  .then(() => {
    console.log("DB connected");
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
    app.on("error", (err) => {
      console.log("Server error: ", err);
    });
  })
  .catch((err) => console.log("DB connection error: ${err.message}"));
