const StateDAO = require('./state-dao');

class StateController {
  createEndpoints(httpHandlers) {
    httpHandlers.get('/v1/state', (req, res) => {
      StateDAO.getStates()
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

const stateController = new StateController();

module.exports = {
  StateController: stateController,
};
