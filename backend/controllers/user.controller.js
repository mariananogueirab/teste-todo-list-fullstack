const {userCreate} = require('../services/user.services');
const {created} = require('../utils/dictionary/statusCode');

const createUser = async (req, res, next) => {
  try {
    const user = req.body;
    const token = await userCreate(user);

    return res.status(created).json({token});
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createUser,
};
