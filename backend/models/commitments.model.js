const {ObjectId} = require('mongodb');
const connect = require('./connection');

const DB_COLLECTION = 'Commitments';

const create = async (newCommitment) => {
  const {commitment, date, user} = newCommitment;
  const db = await connect();
  const {insertedId} = await db.collection(DB_COLLECTION)
      .insertOne({
        commitment, date, user,
      });
  return insertedId;
};

const getAll = async (user) => {
  const db = await connect();
  const commitments = await db.collection(DB_COLLECTION)
      .find({user})
      .toArray();
  return commitments;
};

const getAllByDate = async (user) => {
  const db = await connect();
  const commitments = await db.collection(DB_COLLECTION)
      .find({user})
      .sort({date: 1}) // os que estão mais próximos primeiro
      .toArray();
  return commitments;
};

const findCommitmentById = async (id) => {
  const db = await connect();
  const commitment = await db.collection(DB_COLLECTION)
      .findOne({_id: ObjectId(id)});

  return commitment;
};

const updateCommitment = async (updatedCommitment) => {
  const {commitment, date, user, id} = updatedCommitment;
  const db = await connect();
  await db.collection(DB_COLLECTION)
      .updateOne({_id: ObjectId(id)}, {
        $set: {
          commitment, date, user,
        },
      });
  const newCommitment = await findCommitmentById(id);
  return newCommitment;
};

const deleteCommitment = async (id) => {
  const db = await connect();
  const commitment = await findCommitmentById(id);
  await db.collection(DB_COLLECTION)
      .deleteOne({_id: ObjectId(id)}, {});
  return commitment;
};

module.exports = {
  create,
  getAll,
  getAllByDate,
  updateCommitment,
  deleteCommitment,
};
