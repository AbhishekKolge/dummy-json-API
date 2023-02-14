const { StatusCodes } = require('http-status-codes');

const CustomError = require('../errors');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (username !== process.env.USER) {
    throw new CustomError.UnauthenticatedError('Invalid username');
  }

  if (password !== process.env.PASSWORD) {
    throw new CustomError.UnauthenticatedError('Invalid password');
  }

  res.status(StatusCodes.OK).json({
    apiKey: process.env.API_KEY,
  });
};

module.exports = {
  login,
};
