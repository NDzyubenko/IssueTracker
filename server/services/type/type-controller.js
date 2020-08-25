const TypeDAO = require('./type-dao');

class TypeController {
  createEndpoints(httpHandlers) {
    httpHandlers.get('/v1/type', (req, res) => {
      TypeDAO.getTypes()
        .then(data => {
          res.status(200);
          res.send(data);
        })
        .catch(err => {
          res.status(404);
          res.send(err);
        });
    });
  }
}

const typeController = new TypeController();

module.exports = {
  TypeController: typeController,
};
