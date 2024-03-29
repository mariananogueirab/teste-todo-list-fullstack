const connect = require('./connection');

const DB_COLLECTION = 'Users';

const create = async (user) => {
  const {username, email, password} = user;
  const db = await connect();
  const {insertedId} = await db.collection(DB_COLLECTION)
      .insertOne({username, email, password});
  return insertedId;
};

const findUser = async (email) => {
  const db = await connect();
  const userFound = await db.collection(DB_COLLECTION)
      .findOne({email});
  return userFound;
};

module.exports = {
  create,
  findUser,
};
