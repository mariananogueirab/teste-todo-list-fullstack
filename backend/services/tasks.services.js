const {
  create,
  getAll,
  getAllByAlphab,
  getAllByDate,
  getAllCompleted,
  getAllNotCompleted,
} = require('../models/tasks.model');
const {noTasksYet} = require('../utils/dictionary/messagesDefault');
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

const findTasksCompleted = async (user) => {
  const tasks = await getAllCompleted(user);

  if (tasks.length == 0) throw errorHandling(notFound, noTasksYet);

  return tasks;
};

const findTasksNotCompleted = async (user) => {
  const tasks = await getAllNotCompleted(user);

  if (tasks.length == 0) throw errorHandling(notFound, noTasksYet);

  return tasks;
};

module.exports = {
  taskCreate,
  findTasks,
  findTasksByAlphab,
  findTasksByDate,
  findTasksCompleted,
  findTasksNotCompleted,
};
