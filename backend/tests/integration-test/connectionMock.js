const {MongoClient} = require('mongodb');
const {MongoMemoryServer} = require('mongodb-memory-server');

const DBServer = new MongoMemoryServer();

const getConnection = async () => {
  const URLMock = await DBServer.getUri();
  const connectionMock = await MongoClient.connect(
      URLMock,
      {useNewUrlParser: true, useUnifiedTopology: true},
  );

  return connectionMock;
};


module.exports = {getConnection};
