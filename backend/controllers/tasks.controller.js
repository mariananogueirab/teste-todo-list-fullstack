const {taskCreate} = require('../services/tasks.services');
const { created } = require('../utils/dictionary/statusCode');

const createTask = async (req, res, next) => {
  try {
    const id = await taskCreate(req.body);
    const newTask = {
      _id: id,
      ...req.body,
    };

    return res.status(created).json(newTask);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
};
