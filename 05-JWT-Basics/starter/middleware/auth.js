const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authentificationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError(
      "Authentication invalid due to no token provided"
    );
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const { username } = decoded;
    req.user = { username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

module.exports = authentificationMiddleware;
