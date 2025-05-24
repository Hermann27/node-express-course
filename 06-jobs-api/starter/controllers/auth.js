// Import the User model to interact with the users collection
const User = require("../models/User");
// Import HTTP status codes for consistent responses
const { StatusCodes } = require("http-status-codes");
// Import custom error classes for error handling
const { BadRequestError, UnauthenticatedError } = require("../errors");

// Controller for registering a new user
const register = async (req, res) => {
  // Create a new user with the data from the request body
  const user = await User.create({ ...req.body });
  // Generate a JWT token for the new user
  const token = user.createJWT();
  // Respond with the user's name and the generated token
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

// Controller for logging in an existing user
const login = async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;
  // Check if both email and password are provided
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  // Find the user by email in the database
  const user = await User.findOne({ email });
  // If user is not found, throw an authentication error
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  // Compare the provided password with the stored hashed password
  const isPasswordCorrect = await user.comparePassword(password);
  // If the password is incorrect, throw an authentication error
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  // Generate a JWT token for the authenticated user
  const token = user.createJWT();
  // Respond with the user's name and the generated token
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

// Export the register and login controllers for use in routes
module.exports = {
  register,
  login,
};
