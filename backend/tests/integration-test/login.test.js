const chai = require('chai');
const {
  describe, it, before, after,
} = require('mocha');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const {MongoClient} = require('mongodb');
const {getConnection} = require('./connectionMock');
const app = require('../../index');
const users = require('../utils/users');
const login = require('../utils/login');

chai.use(chaiHttp);

const {expect} = chai;

describe('POST /login', () => {
  let response = {};

  before(async () => {
    const connectionMock = await getConnection();

    sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

    await chai.request(app)
        .post('/user')
        .send(users[0]);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Quando o login é realizado com sucesso', () => {
    before(async () => {
      response = await chai.request(app)
          .post('/login')
          .send(login[0]);
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });
  });

  describe('Quando o email não é passado', () => {
    before(async () => {
      response = await chai.request(app)
          .post('/login')
          .send(login[1]);
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
          .post('/login')
          .send(login[2]);
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
    describe('quando o email é inválido', () => {
      before(async () => {
        response = await chai.request(app)
            .post('/login')
            .send(login[3]);
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
            .post('/login')
            .send(login[4]);
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

  describe('Quando o usuário não é encontrado', () => {
    before(async () => {
      response = await chai.request(app)
          .post('/login')
          .send(login[5]);
    });

    it('recebe o status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it(
        'a propriedade "message" possui o texto "Incorrect login"',
        () => {
          expect(response.body.message)
              .to.be.equal('Incorrect login');
        },
    );
  });
});
