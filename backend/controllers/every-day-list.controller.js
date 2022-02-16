const {
  everyDayTaskCreate,
  findTasks,
  findTasksByAlphab,
  taskUpdate,
  taskCompletedUpdate,
  taskDeleted,
} = require('../services/every-day-list.services');
const {created, success} = require('../utils/dictionary/statusCode');

const createEveryDayTask = async (req, res, next) => {
  const {user} = req;
  try {
    const newTask = {
      ...req.body,
      user: user.email,
    };
    const id = await everyDayTaskCreate(newTask);

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

const update = async (req, res, next) => {
  try {
    const {user} = req;
    const {id} = req.params;
    const task = await taskUpdate({...req.body, user: user.email, id});

    return res.status(success).json(task);
  } catch (error) {
    next(error);
  }
};

const updateCompletedTask = async (req, res, next) => {
  try {
    const {id} = req.params;
    const task = await taskCompletedUpdate(id);

    return res.status(success).json(task);
  } catch (error) {
    next(error);
  }
};

const taskDelete = async (req, res, next) => {
  try {
    const {id} = req.params;
    const task = await taskDeleted(id);

    return res.status(success).json(task);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEveryDayTask,
  getTasks,
  getTasksByAlphab,
  update,
  updateCompletedTask,
  taskDelete,
};
