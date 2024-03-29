const {getUser} = require('../services/login.services');
const {success} = require('../utils/dictionary/statusCode');

const login = async (req, res, next) => {
  try {
    const {token, username} = await getUser(req.body);
    return res.status(success).json({token, username});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
