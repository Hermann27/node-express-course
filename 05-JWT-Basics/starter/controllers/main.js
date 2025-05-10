const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username && !password) {
    throw new BadRequestError("Please provide email and password ");
  }
  if (!username) {
    throw new BadRequestError("Please provide email ");
  }
  if (!password) {
    throw new BadRequestError("Please provide password ");
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "User Created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100) + 1;
  res.status(200).json({
    msg: "Fake Dashboard Route",
    user: req.user,
    secret: `Your lucky number is ${luckyNumber}`,
  });
};
module.exports = {
  login,
  dashboard,
};
