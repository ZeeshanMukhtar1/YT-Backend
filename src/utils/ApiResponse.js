class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message; // Response message (default is "Success")
    this.success = statusCode < 400; // Indicates whether the request was successful (status code less than 400)
  }
}

export { ApiResponse };
