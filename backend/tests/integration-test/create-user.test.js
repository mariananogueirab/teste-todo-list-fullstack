const chai = require('chai');
const {
  describe, it, before, after,
} = require('mocha');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const {MongoClient} = require('mongodb');
const {MongoMemoryServer} = require('mongodb-memory-server');
const {getConnection} = require('./connectionMock');
const app = require('../../index');
const users = require('../utils/users');

chai.use(chaiHttp);

const {expect} = chai;

describe('POST /user', () => {
  let response = {};

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

  describe('quando o usuário é criado com sucesso', () => {
    before(async () => {
      response = await chai.request(app)
          .post('/user')
          .send(users[0]);
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });
  });

  describe('Quando o username não é passado', () => {
    before(async () => {
      response = await chai.request(app)
          .post('/user')
          .send(users[1]);
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
        'a propriedade "message" possui o texto "\"username\" is required"',
        () => {
          expect(response.body.message)
              .to.be.equal('"username" is required');
        },
    );
  });

  describe('Quando o email não é passado', () => {
    before(async () => {
      response = await chai.request(app)
          .post('/user')
          .send(users[2]);
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
        'a propriedade "message" possui o texto ""email" is required"',
        () => {
          expect(response.body.message)
              .to.be.equal('"email" is required');
        },
    );
  });

  describe('Quando o password não é passado', () => {
    before(async () => {
      response = await chai.request(app)
          .post('/user')
          .send(users[3]);
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
        'a propriedade "message" possui o texto ""password" is required"',
        () => {
          expect(response.body.message)
              .to.be.equal('"password" is required');
        },
    );
  });

  describe('Quando o payload é inválido', () => {
    describe('quando o username tem menos do que 5 caracteres', () => {
      before(async () => {
        response = await chai.request(app)
            .post('/user')
            .send(users[4]);
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
          `"message" possui o texto
           ""username" length must be at least 5 characters long"`,
          () => {
            expect(response.body.message)
                .to.be
                .equal( '"username" length must be at least 5 characters long');
          },
      );
    });

    describe('quando o email é inválido', () => {
      before(async () => {
        response = await chai.request(app)
            .post('/user')
            .send(users[5]);
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
          `"message" possui o texto ""email" must be a valid email"`,
          () => {
            expect(response.body.message)
                .to.be
                .equal('"email" must be a valid email');
          },
      );
    });

    describe('quando o password é inválido', () => {
      before(async () => {
        response = await chai.request(app)
            .post('/user')
            .send(users[6]);
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
          `"message" possui o texto ""password" length
           must be at least 6 characters long"`,
          () => {
            expect(response.body.message)
                .to.be
                .equal('"password" length must be at least 6 characters long');
          },
      );
    });
  });

  describe('Quando o usuário já está cadastrado', () => {
    before(async () => {
      response = await chai.request(app)
          .post('/user')
          .send(users[0]);

      await chai.request(app)
          .post('/user')
          .send(users[1]);
    });

    it('recebe o status 409', () => {
      expect(response).to.have.status(409);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it(
        'a propriedade "message" possui o texto "User already registered"',
        () => {
          expect(response.body.message)
              .to.be.equal('User already registered');
        },
    );
  });
});
