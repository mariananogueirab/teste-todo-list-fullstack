const {create} = require('../models/tasks.model');
const {badRequest} = require('../utils/dictionary/statusCode');
const Joi = require('joi').extend(require('@hapi/joi-date'));
const errorHandling = require('../utils/functions/errorHandling');

const taskSchema = Joi.object({
  task: Joi.string().min(5).required(),
  limitDate: Joi.date().format('DD/MM/YYYY'),
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

module.exports = {
  taskCreate,
};