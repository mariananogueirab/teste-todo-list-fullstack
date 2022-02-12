const {
  create,
  getAll,
  getAllByAlphab,
  getAllByDate,
  getAllByStatus,
  updateTask,
  updateTaskCompleted,
} = require('../models/tasks.model');
const {
  noTasksYet,
  taskNotFound,
} = require('../utils/dictionary/messagesDefault');
const {badRequest, notFound} = require('../utils/dictionary/statusCode');
const Joi = require('joi').extend(require('@hapi/joi-date'));
const errorHandling = require('../utils/functions/errorHandling');

const taskSchema = Joi.object({
  task: Joi.string().min(5).required(),
  limitDate: Joi.date().format('YYYY-MM-DD'),
});

const taskValidate = (task, limitDate) => {
  const {error} = taskSchema.validate({
    task, limitDate,
  });

  if (error) throw errorHandling(badRequest, error.message);
};

const taskCreate = async (newTask) => {
  const {task, limitDate} = newTask;
  taskValidate(task, limitDate);
  const id = await create(newTask);
  return id;
};

const findTasks = async (user) => {
  const tasks = await getAll(user);

  if (tasks.length == 0) throw errorHandling(notFound, noTasksYet);

  return tasks;
};

const findTasksByAlphab = async (user) => {
  const tasks = await getAllByAlphab(user);

  if (tasks.length == 0) throw errorHandling(notFound, noTasksYet);

  return tasks;
};

const findTasksByDate = async (user) => {
  const tasks = await getAllByDate(user);

  if (tasks.length == 0) throw errorHandling(notFound, noTasksYet);

  return tasks;
};

const findTasksByStatus = async (user) => {
  const tasks = await getAllByStatus(user);

  if (tasks.length == 0) throw errorHandling(notFound, noTasksYet);

  return tasks;
};

const taskUpdate = async (updatedTask) => {
  const {task, limitDate} = updatedTask;
  taskValidate(task, limitDate);
  const newTask = await updateTask(updatedTask);
  if (!newTask) throw errorHandling(notFound, taskNotFound);

  return newTask;
};

const taskCompletedUpdate = async (id) => {
  const newTask = await updateTaskCompleted(id);
  if (!newTask) throw errorHandling(notFound, taskNotFound);

  return newTask;
};

module.exports = {
  taskCreate,
  findTasks,
  findTasksByAlphab,
  findTasksByDate,
  findTasksByStatus,
  taskUpdate,
  taskCompletedUpdate,
};
