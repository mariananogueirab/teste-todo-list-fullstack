const {
  commitmentCreate,
  findCommitments,
  findCommitmentsByDate,
  commitmentUpdate,
  commitmentDeleted
} = require('../services/commitments.services');
const {created, success} = require('../utils/dictionary/statusCode');

const createCommitment = async (req, res, next) => {
  const {user} = req;
  try {
    const newCommitment = {
      ...req.body,
      user: user.email,
    };
    const id = await commitmentCreate(newCommitment);

    return res.status(created).json({_id: id, ...newCommitment});
  } catch (error) {
    next(error);
  }
};

const getCommitments = async (req, res, next) => {
  const {user} = req;
  try {
    const commitments = await findCommitments(user.email);
    return res.status(success).json(commitments);
  } catch (error) {
    next(error);
  }
};

const getCommitmentsByDate = async (req, res, next) => {
  const {user} = req;
  try {
    const commitments = await findCommitmentsByDate(user.email);
    return res.status(success).json(commitments);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const {user} = req;
    const {id} = req.params;
    const commitment = await commitmentUpdate(
        {...req.body, user: user.email, id});

    return res.status(success).json(commitment);
  } catch (error) {
    next(error);
  }
};

const commitmentDelete = async (req, res, next) => {
  try {
    const {id} = req.params;
    const commitment = await commitmentDeleted(id);

    return res.status(success).json(commitment);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCommitment,
  getCommitments,
  getCommitmentsByDate,
  update,
  commitmentDelete,
};
