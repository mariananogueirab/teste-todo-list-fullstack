const {
  create,
  getAll,
  getAllByDate,
  updateCommitment,
  deleteCommitment,
} = require('../models/commitments.model');
const {
  noCommitmentsYet,
  commitmentNotFound,
} = require('../utils/dictionary/messagesDefault');
const {badRequest, notFound} = require('../utils/dictionary/statusCode');
const Joi = require('joi').extend(require('@hapi/joi-date'));
const errorHandling = require('../utils/functions/errorHandling');

const commitmentSchema = Joi.object({
  commitment: Joi.string().min(2).required(),
  date: Joi.date().format('YYYY-MM-DD'),
});

const editCommitmentSchema = Joi.object({
  commitment: Joi.string().min(2),
  date: Joi.date().format('YYYY-MM-DD'),
});

const commitmentValidate = (commitment, date) => {
  const {error} = commitmentSchema.validate({
    commitment, date,
  });

  if (error) throw errorHandling(badRequest, error.message);
};

const editCommitmentValidate = (commitment, date) => {
  const {error} = editCommitmentSchema.validate({
    commitment, date,
  });

  if (error) throw errorHandling(badRequest, error.message);
};

const commitmentCreate = async (newCommitment) => {
  const {commitment, date} = newCommitment;
  commitmentValidate(commitment, date);
  const id = await create(newCommitment);
  return id;
};

const findCommitments = async (user) => {
  const commitments = await getAll(user);

  if (commitments.length == 0) throw errorHandling(notFound, noCommitmentsYet);

  return commitments;
};

const findCommitmentsByDate = async (user) => {
  const commitments = await getAllByDate(user);

  if (commitments.length == 0) throw errorHandling(notFound, noCommitmentsYet);

  return commitments;
};

const commitmentUpdate = async (updatedCommitment) => {
  const {commitment, date} = updatedCommitment;
  editCommitmentValidate(commitment, date);
  if (commitment === '' && date === '') {
    throw errorHandling(badRequest, invalidEntry);
  };
  const newCommitment = await updateCommitment(updatedCommitment);
  if (!newCommitment) throw errorHandling(notFound, commitmentNotFound);

  return newCommitment;
};

const commitmentDeleted = async (id) => {
  const commitment = await deleteCommitment(id);
  if (!commitment) throw errorHandling(notFound, commitmentNotFound);
  return commitment;
};

module.exports = {
  commitmentCreate,
  findCommitments,
  findCommitmentsByDate,
  commitmentUpdate,
  commitmentDeleted,
};
