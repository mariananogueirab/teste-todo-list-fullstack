const Joi = require('joi');
const {create, findUser} = require('../models/user.model');
const {userAlreadyRegistered} = require('../utils/dictionary/messagesDefault');
const {badRequest, conflict} = require('../utils/dictionary/statusCode');
const errorHandling = require('../utils/functions/errorHandling');
const {generateToken} = require('./authService');

const userSchema = Joi.object({
  username: Joi.string().min(5).required(),
  email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).required(),
  password: Joi.string().min(6).required(),
});

const validateUser = (username, email, password) => {
  const {error} = userSchema.validate({
    username, email, password,
  });
  if (error) throw errorHandling(badRequest, error.message);
};

const validateUserAlreadyExists = async (user) => {
  const userFound = await findUser(user);
  if (userFound) throw errorHandling(conflict, userAlreadyRegistered);
};

const userCreate = async (user) => {
  const {username, email, password} = user;
  validateUser(username, email, password);
  await validateUserAlreadyExists(user);
  await create(user);

  const {password: _password, ...userWithoutPassword} = user;

  const token = generateToken(userWithoutPassword);

  return token;
};

module.exports = {
  userCreate,
};
