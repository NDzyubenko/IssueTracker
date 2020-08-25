const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const Auth = require('./services/auth/auth').Auth;
const UserController = require('./services/user/user-controller').UserController;
const IssueController = require('./services/issue/issue-controller').IssueController;
const StateController = require('./services/state/state-controller').StateController;
const TypeController = require('./services/type/type-controller').TypeController;

const isInTestEnv = require('./services/helpers').isInTestEnv;

const Server = (function() {
  const DEFAULT_PORT = 3000;
  let SERVER_PORT;

  let app;

  function createInstance() {
    app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, '/public')));
    app.use(express.static(path.join(__dirname, '/')));
    app.use(/^(\/v1(?!(\/auth|\/user\/register)).*$).*/gm, (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(402);
        res.send();
      }
      Auth.tokenIsValid(authHeader)
        .then((decoded) => {
          if (!req.body.id) {
            req.body.id = decoded.id.id;
          }
          next();
        })
        .catch((err) => {
          res.status(402);
          res.send(err);
        });
    });
  }

  function createEndpoints() {
    if (!app) {
      return;
    }
    app.get(/^(?!\/v1.*$).*/gm, (req, res) => {
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Ray of Hope</title>
            <link rel="stylesheet" href="css/styles.css" />
            <script src="client.js" defer></script>
          </head>
          <body>
            <div id="root"></div>
          </body>
        </html>
      `);
    });
  }

  function start(port) {
    SERVER_PORT = port || DEFAULT_PORT;
    app.listen(SERVER_PORT, () => console.log(`Server is running on 127.0.0.1:${SERVER_PORT}`));
  }

  function init() {
    if (!app) {
      createInstance();
    }
  }

  function getApp() {
    return app;
  }

  function getHTTPHandlers() {
    if (!app) {
      throw new Error('Server must be initialized!');      
    }
    return {
      use: app.use.bind(app),
      get: app.get.bind(app),
      post: app.post.bind(app),
      put: app.put.bind(app),
      patch: app.patch.bind(app),
    };
  }

  return {
    init,
    createEndpoints,
    start,
    getHTTPHandlers,
    getApp: isInTestEnv() ? getApp : undefined,
  };
})();

Server.init();
Server.createEndpoints();

StateController.createEndpoints(Server.getHTTPHandlers());
TypeController.createEndpoints(Server.getHTTPHandlers());
UserController.createEndpoints(Server.getHTTPHandlers());
IssueController.createEndpoints(Server.getHTTPHandlers());

Server.start(5000);

if (isInTestEnv()) {
  module.exports = Server.getApp();
}
