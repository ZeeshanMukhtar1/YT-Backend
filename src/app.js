import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Router } from "express";
const router = Router();
const app = express();

// Middleware to handle Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Middleware to parse incoming JSON requests
app.use(
  express.json({
    limit: "20kb",
  })
);

// Middleware to parse incoming URL-encoded data
app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  })
);

// Middleware to serve static files from the "public" directory
app.use(express.static("public"));

// Middleware to parse cookies from incoming requests
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.route.js";
app.use("/api/v1/users", userRouter);

import healthCheckRouter from "./routes/health.route.js";
app.use("/api/v1/users/health", healthCheckRouter);

export { app };

// if we are using the direct route like app.get("/api/v1/users", userRouter); we will use app.get
// but we are using routes from the express router so we will use app.use middleware
