const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username && !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }
  if (!username) {
    return res.status(400).json({ message: "Please provide email" });
  }
  if (!password) {
    return res.status(400).json({ message: "Please provide password" });
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRESIN,
  });

  res.status(200).json({ message: "User Created", token });
};
const hello = async (req, res) => {
  res
    .status(200)
    .json({ message: `Hello, ${req.user.username}! Welcome back.` });
};
module.exports = { login, hello };
