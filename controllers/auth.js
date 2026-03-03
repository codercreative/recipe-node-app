const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthenticatedError } = require("../errors");

// View model/auth.js for setup of JWT and name method
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  // JWT token
  const token = user.createJWT();
  // show user name on front end?
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName() }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
