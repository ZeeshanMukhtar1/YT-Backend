import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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

export { app };
