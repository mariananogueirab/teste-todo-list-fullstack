const chai = require('chai');
const {
  describe, it, before, after,
} = require('mocha');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const {MongoClient} = require('mongodb');
const {MongoMemoryServer} = require('mongodb-memory-server');
const app = require('../../index');
const users = require('../utils/users');
const tasks = require('../utils/tasks');
const login = require('../utils/login');

chai.use(chaiHttp);

const {expect} = chai;

describe('POST /tasks', () => {
  let response;

  const DBServer = new MongoMemoryServer();

  before(async () => {
    const URLMock = await DBServer.getUri();
    const connectionMock = await MongoClient.connect(
        URLMock,
        {useNewUrlParser: true, useUnifiedTopology: true},
    );

    sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('Quando não é passado um JWT para autenticação', () => {
    before(async () => {
      response = await chai.request(app)
          .post('/tasks')
          .set('authorization', '');
    });

    it('retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui a mensagem "Token not found"', () => {
      expect(response.body.message).to.be.equal('Token not found');
    });
  });

  describe('Quando a tarefa é criada com sucesso', () => {
    before(async () => {
      await chai.request(app)
          .post('/user')
          .send(users[0]);

      const token = await chai.request(app)
          .post('/login')
          .send(login[0]);

      response = await chai.request(app)
          .post('/tasks')
          .set('authorization', token.body.token)
          .send(tasks[0]);
    });

    it('retorna código de status "201"', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "_id"', () => {
      expect(response.body).to.have.property('_id');
    });
  });

  describe('Quando o payload é inválido', () => {
    let token;
    before(async () => {
      await chai.request(app)
          .post('/user')
          .send(users[0]);

      token = await chai.request(app)
          .post('/login')
          .send(login[0]);
    });

    describe('quando a tarefa não é passada', () => {
      before(async () => {
        response = await chai.request(app)
            .post('/tasks')
            .set('authorization', token.body.token)
            .send({});
      });

      it('recebe o status 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it(
          'a propriedade "message" possui o texto ""task" is required"',
          () => {
            expect(response.body.message)
                .to.be.equal('"task" is required');
          },
      );
    });

    describe(
        'quando a tarefa não possui o número de caracteres mínimos', () => {
          before(async () => {
            response = await chai.request(app)
                .post('/tasks')
                .set('authorization', token.body.token)
                .send(tasks[1]);
          });

          it('recebe o status 400', () => {
            expect(response).to.have.status(400);
          });

          it('retorna um objeto', () => {
            expect(response.body).to.be.a('object');
          });

          it('o objeto possui a propriedade "message"', () => {
            expect(response.body).to.have.property('message');
          });

          it(
              `a propriedade "message" possui o texto 
              ""task" length must be at least 5 characters long"`,
              () => {
                expect(response.body.message).to.be
                    .equal('"task" length must be at least 5 characters long');
              },
          );
        });

    describe('quando o formato da data é inválido', () => {
      before(async () => {
        response = await chai.request(app)
            .post('/tasks')
            .set('authorization', token.body.token)
            .send(tasks[2]);
      });

      it('recebe o status 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it(
          `a propriedade "message" possui o texto 
          ""limitDate" must be in DD/MM/YYYY format"`,
          () => {
            expect(response.body.message).to.be
                .equal('"limitDate" must be in DD/MM/YYYY format');
          },
      );
    });
  });
});
