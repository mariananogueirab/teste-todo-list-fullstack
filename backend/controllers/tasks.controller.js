const {
  taskCreate,
  findTasks,
  findTasksByAlphab,
  findTasksByDate,
  findTasksCompleted,
  findTasksNotCompleted,
} = require('../services/tasks.services');
const {created, success} = require('../utils/dictionary/statusCode');

const createTask = async (req, res, next) => {
  const {user} = req;
  try {
    const newTask = {
      ...req.body,
      user: user.email,
    };
    const id = await taskCreate(newTask);

    return res.status(created).json({_id: id, ...newTask});
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  const {user} = req;
  try {
    const tasks = await findTasks(user.email);
    return res.status(success).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTasksByAlphab = async (req, res, next) => {
  const {user} = req;
  try {
    const tasks = await findTasksByAlphab(user.email);
    return res.status(success).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTasksByDate = async (req, res, next) => {
  const {user} = req;
  try {
    const tasks = await findTasksByDate(user.email);
    return res.status(success).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTasksCompleted = async (req, res, next) => {
  const {user} = req;
  try {
    const tasks = await findTasksCompleted(user.email);
    return res.status(success).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTasksNotCompleted = async (req, res, next) => {
  const {user} = req;
  try {
    const tasks = await findTasksNotCompleted(user.email);
    return res.status(success).json(tasks);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTasksByAlphab,
  getTasksByDate,
  getTasksCompleted,
  getTasksNotCompleted,
};
