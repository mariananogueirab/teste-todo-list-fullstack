const {
  create,
  getAll,
  getAllByAlphab,
  updateTask,
  updateTaskCompleted,
  deleteTask,
} = require('../models/every-day-list.model');
const {
  noTasksYet,
  invalidEntry,
  taskNotFound,
} = require('../utils/dictionary/messagesDefault');
const {badRequest, notFound} = require('../utils/dictionary/statusCode');
const Joi = require('joi').extend(require('@hapi/joi-date'));
const errorHandling = require('../utils/functions/errorHandling');

const everyDayListSchema = Joi.object({
  task: Joi.string().min(3).required(),
  checked: Joi.bool(),
});

const everyDayValidate = (task, checked) => {
  const {error} = everyDayListSchema.validate({
    task, checked,
  });

  if (error) throw errorHandling(badRequest, error.message);
};

const everyDayTaskCreate = async (newTask) => {
  const {task, checked} = newTask;
  everyDayValidate(task, checked);
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

const taskUpdate = async (updatedTask) => {
  const {task} = updatedTask;
  if (task === '' && limitDate === '') {
    throw errorHandling(badRequest, invalidEntry);
  };
  const newTask = await updateTask(updatedTask);
  if (!newTask) throw errorHandling(notFound, taskNotFound);

  return newTask;
};

const taskCompletedUpdate = async (id) => {
  const newTask = await updateTaskCompleted(id);
  if (!newTask) throw errorHandling(notFound, taskNotFound);

  return newTask;
};

const taskDeleted = async (id) => {
  const task = await deleteTask(id);
  if (!task) throw errorHandling(notFound, taskNotFound);
  return task;
};

module.exports = {
  everyDayTaskCreate,
  findTasks,
  findTasksByAlphab,
  taskUpdate,
  taskCompletedUpdate,
  taskDeleted,
};
