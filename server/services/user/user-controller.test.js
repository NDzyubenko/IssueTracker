const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const server = require('../../server');
const UserDAO = require('./user-dao');
const UserController = require('./user-controller').UserController;

chai.use(chaiHttp);

describe('(Controller) UserController', () => {
  const user = {
    email: 'email@example.com',
    password: 'password',
  };

  UserDAO.insertUser(user);

  it('should log user in', (done) => {
    chai.request(server)
      .post('/auth')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });

  it('should not log in an unregistered user', (done) => {
    chai.request(server)
      .post('/auth')
      .send({
        email: 'email',
        password: 'pass',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(402);
        done();
      });
  });

  it('should return all users', () => {
    chai.request(server)
      .get('/user')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(typeof res.body).to.be("Array");
        done();
      });
  });
});
