import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const health = asyncHandler(async (req, res, next) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Healthy",
        "All systems are happy and healthy. Your app is in good hands!"
      )
    );
});

export { health };
