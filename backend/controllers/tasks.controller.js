const {
  taskCreate,
  findTasks,
  findTasksByAlphab,
  findTasksByDate,
  findTasksByStatus,
  taskUpdate,
  taskCompletedUpdate,
  taskDeleted,
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

const getTasksByStatus = async (req, res, next) => {
  const {user} = req;
  try {
    const tasks = await findTasksByStatus(user.email);
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
  createTask,
  getTasks,
  getTasksByAlphab,
  getTasksByDate,
  getTasksByStatus,
  update,
  updateCompletedTask,
  taskDelete,
};
