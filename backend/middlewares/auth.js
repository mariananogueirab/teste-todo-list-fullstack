const {findUser} = require('../models/user.model');
const {verifyToken} = require('../services/authService');
const {
  jwtMalformed,
  missingAuth,
  userNotFound,
} = require('../utils/dictionary/messagesDefault');
const {unauthorized} = require('../utils/dictionary/statusCode');
const errorHandling = require('../utils/functions/errorHandling');

module.exports = async (req, res, next) => {
  try {
    const {authorization} = req.headers;

    if (!authorization) res.status(unauthorized).json({message: missingAuth});

    const user = verifyToken(authorization);

    if (!user) res.status(unauthorized).json({message: jwtMalformed});

    const userFound = await findUser(user.email);

    if (!userFound) throw errorHandling(unauthorized, userNotFound);


    req.user = user;
    next();
  } catch (error) {
    console.log('FALHA AUTH');
    return res.status(error.status).json({message: error.message});
  }
};
