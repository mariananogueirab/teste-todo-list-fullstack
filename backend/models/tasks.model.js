const connect = require('./connection');

const DB_COLLECTION = 'Tasks';

const create = async (newTask) => {
  const createdDate = new Date();
  const {task, limitDate} = newTask;
  const db = await connect();
  const {insertedId} = await db.collection(DB_COLLECTION)
      .insertOne({
        task, limitDate, createdDate, completed: 'false',
      });
  return insertedId;
};

module.exports = {
  create,
};
