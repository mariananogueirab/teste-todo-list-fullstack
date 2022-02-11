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
  const tasks = await db.collection(DB_COLLECTION).find({user}).toArray();
  return tasks;
};

module.exports = {
  create,
  getAll,
};
