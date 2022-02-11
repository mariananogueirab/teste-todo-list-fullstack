const {ObjectId} = require('mongodb');
const connect = require('./connection');

const DB_COLLECTION = 'Users';

const create = async (user) => {
  const {username, email, password} = user;
  const db = await connect();
  const {insertedId} = await db.collection(DB_COLLECTION)
      .insertOne({username, email, password});
  return insertedId;
};

const findUser = async (user) => {
  const db = await connect();
  const {username, email} = user;
  const userFound = await db.collection(DB_COLLECTION)
      .findOne({username, email});
  return userFound;
};

module.exports = {
  create,
  findUser,
};
