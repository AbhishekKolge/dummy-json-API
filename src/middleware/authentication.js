const CustomError = require('../errors');

const authenticateUserMiddleware = async (req, res, next) => {
  const apiKey = req.header('x-api-key');

  if (apiKey !== process.env.API_KEY) {
    throw new CustomError.UnauthenticatedError(
      'Not authorized to access this route'
    );
  }

  return next();
};

module.exports = {
  authenticateUserMiddleware,
};
