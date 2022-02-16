const {
  create,
  getAll,
  getAllByAlphab,
  getAllByDate,
  getAllByStatus,
  updateTask,
  updateStatus,
  deleteTask,
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

const editTaskSchema = Joi.object({
  task: Joi.string().min(5),
  limitDate: Joi.date().format('YYYY-MM-DD'),
});

const taskValidate = (task, limitDate) => {
  const {error} = taskSchema.validate({
    task, limitDate,
  });

  if (error) throw errorHandling(badRequest, error.message);
};

const editTaskValidate = (task, limitDate) => {
  const {error} = editTaskSchema.validate({
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
  editTaskValidate(task, limitDate);
  if (task === '' && limitDate === '') {
    throw errorHandling(badRequest, invalidEntry);
  };
  const newTask = await updateTask(updatedTask);
  if (!newTask) throw errorHandling(notFound, taskNotFound);

  return newTask;
};

const taskStatusUpdate = async (updatedData) => {
  const newTask = await updateStatus(updatedData);
  if (!newTask) throw errorHandling(notFound, taskNotFound);

  return newTask;
};

const taskDeleted = async (id) => {
  const task = await deleteTask(id);
  if (!task) throw errorHandling(notFound, taskNotFound);
  return task;
};

module.exports = {
  taskCreate,
  findTasks,
  findTasksByAlphab,
  findTasksByDate,
  findTasksByStatus,
  taskUpdate,
  taskStatusUpdate,
  taskDeleted,
};
