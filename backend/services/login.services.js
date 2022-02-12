const Joi = require('joi');
const {findUser} = require('../models/user.model');
const {incorrectData} = require('../utils/dictionary/messagesDefault');
const {
  badRequest,
  unauthorized,
} = require('../utils/dictionary/statusCode');
const errorHandling = require('../utils/functions/errorHandling');
const {generateToken} = require('./authService');

const loginSchema = Joi.object({
  email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).required(),
  password: Joi.string().min(6).required(),
});

const validateLogin = (email, password) => {
  const {error} = loginSchema.validate({
    email, password,
  });
  if (error) throw errorHandling(badRequest, error.message);
};

const getUser = async (user) => {
  const {email, password} = user;
  validateLogin(email, password);
  const userFound = await findUser(email);
  if (!userFound || userFound.password !== password) {
    throw errorHandling(unauthorized, incorrectData);
  }

  const {password: _password, ...userWithoutPassword} = userFound;

  const token = generateToken(userWithoutPassword);
  return token;
};

module.exports = {
  getUser,
};
