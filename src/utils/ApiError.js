// Custom error class for API-related errors
class ApiError extends Error {
  constructor(
    statusCode,
    message = "something went wrong", // Default error message if not provided
    errors = [],
    stack = "" // Stack trace for debugging purposes
  ) {
    // super method will override the message property of the Error class
    super(message);

    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false; // Indicates the failure of the corresponding operation
    this.errors = errors;

    // its good practice to capture the stack trace of the error (Not necessary)
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
