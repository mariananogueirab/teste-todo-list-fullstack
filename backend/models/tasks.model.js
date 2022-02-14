const {ObjectId} = require('mongodb');
const connect = require('./connection');

const DB_COLLECTION = 'Tasks';

const create = async (newTask) => {
  const createdDate = new Date();
  const {task, limitDate, user} = newTask;
  const db = await connect();
  const {insertedId} = await db.collection(DB_COLLECTION)
      .insertOne({
        task, limitDate, createdDate, completed: 'false', user,
      });
  return insertedId;
};

const getAll = async (user) => {
  const db = await connect();
  const tasks = await db.collection(DB_COLLECTION)
      .find({user})
      .toArray();
  return tasks;
};

const getAllByAlphab = async (user) => {
  const db = await connect();
  const tasks = await db.collection(DB_COLLECTION)
      .find({user})
      .sort({task: 1})
      .toArray();
  return tasks;
};

const getAllByDate = async (user) => {
  const db = await connect();
  const tasks = await db.collection(DB_COLLECTION)
      .find({user})
      .sort({createdDate: -1}) // mais recentes primeiro
      .toArray();
  return tasks;
};

const getAllByStatus = async (user) => {
  const db = await connect();
  const tasks = await db.collection(DB_COLLECTION)
      .find({user})
      .sort({completed: 1})
      .toArray();
  return tasks;
};

const findTaskById = async (id) => {
  const db = await connect();
  const task = await db.collection(DB_COLLECTION)
      .findOne({_id: ObjectId(id)});

  return task;
};

const updateTask = async (updatedTask) => {
  const {task, limitDate, user, id} = updatedTask;
  const db = await connect();
  await db.collection(DB_COLLECTION)
      .updateOne({_id: ObjectId(id)}, {
        $set: {
          task, limitDate, user,
        },
      });
  const newTask = await findTaskById(id);
  return newTask;
};

const updateTaskCompleted = async (id) => {
  const db = await connect();
  await db.collection(DB_COLLECTION)
      .updateOne({_id: ObjectId(id)}, {
        $set: {
          completed: 'true',
        },
      });
  const newTask = await findTaskById(id);
  return newTask;
};

const deleteTask = async (id) => {
  const db = await connect();
  const task = await findTaskById(id);
  await db.collection(DB_COLLECTION)
      .deleteOne({_id: ObjectId(id)}, {});
  return task;
};

module.exports = {
  create,
  getAll,
  getAllByAlphab,
  getAllByDate,
  getAllByStatus,
  updateTask,
  updateTaskCompleted,
  deleteTask,
};
