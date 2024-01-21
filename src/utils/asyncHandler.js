//  1st approch
// Async utility to handle asynchronous Express route handlers using Promises

const asyncHandler = (requestHandler) => {
  // This middleware function wraps the provided requestHandler in a Promise
  // and catches any errors that may occur during its execution.
  return (req, res, next) => {
    // Resolve the Promise with the result of the requestHandler
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err)); // Catch any errors and pass them to the next middleware
  };
};

export { asyncHandler };

//  2nd approch
// Async utility to handle asynchronous Express route handlers using async/await

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     // Execute the provided asynchronous function (fn) with the Express request, response, and next parameters
//     await fn(req, res, next);
//   } catch (error) {
//     // If an error occurs during execution, handle it by sending an error response
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message || "Internal Server Error",
//     });
//   }
// };

// export { asyncHandler };
