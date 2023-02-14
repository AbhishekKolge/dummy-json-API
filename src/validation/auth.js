const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

const loginSchema = (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().trim().email().required(),
    password: joiPassword
      .string()
      .min(8)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfSpecialCharacters(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required(),
  });

  req.schema = schema;

  next();
};

module.exports = {
  loginSchema,
};
