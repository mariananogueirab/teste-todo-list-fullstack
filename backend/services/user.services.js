const Joi = require('joi');
const {create, findUser} = require('../models/user.model');
const {userAlreadyRegistered} = require('../utils/dictionary/messagesDefault');
const {badRequest, conflict} = require('../utils/dictionary/statusCode');
const errorHandling = require('../utils/functions/errorHandling');
const {generateToken} = require('./authService');
const bcrypt = require('bcrypt');

const createUserSchema = Joi.object({
  username: Joi.string().min(5).required(),
  email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).required(),
  password: Joi.string().min(6).required(),
});

const validateCreateUser = (username, email, password) => {
  const {error} = createUserSchema.validate({
    username, email, password,
  });
  if (error) throw errorHandling(badRequest, error.message);
};

const validateUserAlreadyExists = async (email) => {
  const userFound = await findUser(email);
  if (userFound) throw errorHandling(conflict, userAlreadyRegistered);
};

const userCreate = async (user) => {
  const {username, email, password} = user;
  validateCreateUser(username, email, password);
  const passwordEncript = await bcrypt.hash(password, 10);
  const userEncrypt = {username, email, password: passwordEncript};

  await validateUserAlreadyExists(email);
  await create(userEncrypt);

  const {password: _password, ...userWithoutPassword} = user;

  const token = generateToken(userWithoutPassword);

  return token;
};

module.exports = {
  userCreate,
};
