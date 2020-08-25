const Auth = require('../auth/auth').Auth;
const UserDAO = require('./user-dao');

class UserController {
    createEndpoints(httpHandlers) {
    httpHandlers.post('/v1/auth', (req, res) => {
      const { email, password } = req.body;
      UserDAO.checkUserExists(email, password)
        .then(id => {
          const token = Auth.createToken(id);
          res.status(200);
          res.send({ auth: true, token });
        })
        .catch(err => {
          res.status(402);
          res.send(err);
        });
    });

    httpHandlers.get('/v1/user', (req, res) => {
      UserDAO.getUsers()
        .then(data => {
          res.status(200);
          res.send(data);
        })
        .catch(err => {
          res.status(400);
          res.send(err);
        });
    });

    httpHandlers.get('/v1/user/:id', (req, res) => {
      const { id } = req.params;
      UserDAO.getUser(id)
        .then(data => {
          res.status(200);
          res.send(data);
        })
        .catch(err => {
          res.status(400);
          res.send(err);
        });
    });

    httpHandlers.put('/v1/user/register', (req, res) => {
      const userDTO = req.body;
      UserDAO.insertUser(userDTO)
        .then(() => {
          res.status(200);
          res.send();
        })
        .catch(err => {
          res.status(400);
          res.send(err.message);
        });
    });
  }
}

const userController = new UserController();

module.exports = {
  UserController: userController,
};