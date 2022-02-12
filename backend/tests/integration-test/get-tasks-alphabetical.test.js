const chai = require('chai');
const {
  describe, it, before, after,
} = require('mocha');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const {MongoClient} = require('mongodb');
const {getConnection} = require('./connectionMock');
const app = require('../../index');
const getTasks = require('../utils/getTasks');
const users = require('../utils/users');
const login = require('../utils/login');

chai.use(chaiHttp);

const {expect} = chai;

describe('GET /tasks/alphabetical', () => {
  let response;
  let token;

  before(async () => {
    const connectionMock = await getConnection();

    sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

    await chai.request(app)
        .post('/user')
        .send(users[0]);

    token = await chai.request(app)
        .post('/login')
        .send(login[0]);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Quando não há tarefas cadastradas', () => {
    let response;

    before( async () => {
      response = await chai.request(app)
          .get('/tasks/alphabetical')
          .set('authorization', token.body.token);
    });

    it('recebe o status 404', () => {
      expect(response).to.have.status(404);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "No tasks yet"',
        () => {
          expect(response.body.message)
              .to.be.equal('No tasks yet');
        },
    );
  });

  describe('quando as tarefas são encontradas com sucesso', () => {
    before( async () => {
      Promise.all(
          getTasks.map(async (task) => {
            await chai.request(app)
                .post('/tasks')
                .set('authorization', token.body.token)
                .send(task);
          }),
      );

      response = await chai.request(app)
          .get('/tasks/alphabetical')
          .set('authorization', token.body.token);
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um array', () => {
      expect(response.body).to.be.a('array');
    });

    it('retorna um array', () => {
      expect(response.body).to.have.length(3);
    });

    it('a primeira tarefa é "Aplicar para vaga de backend X"', () => {
      expect(response.body[0].task).to.be
          .equal('Aplicar para vaga de backend X');
    });
  });
});
