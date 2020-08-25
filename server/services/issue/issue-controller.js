const IssueDAO = require('./issue-dao');

class IssueController {
  createEndpoints(httpHandlers) {
    httpHandlers.get('/v1/issue', (req, res) => {
      const orderByParams = req.query;
      IssueDAO.getAllIssues(orderByParams)
        .then(data => {
          res.status(200);
          res.send(data);
        })
        .catch(err => {
          res.status(400);
          res.send(err);
        })

      /*IssueDAO.addIssue({
        type: 'Task',
        title: 'Test task',
        assignedTo: 1,
        createdBy: 1,
        description: 'Desc',
        state: 'NEW',
        createdOn: new Date().getTime(),
      });*/
    });

    httpHandlers.get('/v1/issue/assignedToMe', (req, res) => {
      const { orderByParams } = req.query;
      const { id } = req.body;
      IssueDAO.getOpenIssuesAssignedTo(id, orderByParams)
        .then(data => {
          res.status(200);
          res.send(data);
        })
        .catch(err => {
          res.status(400);
          res.send(err);
        });
    });

    httpHandlers.get('/v1/issue/:id', (req, res) => {
      const { id } = req.params;
      IssueDAO.getIssue(id)
        .then(data => {
          res.status(200);
          res.send(data);
        })
        .catch(err => {
          res.status(400);
          res.send(err);
        })
    });

    httpHandlers.post('/v1/issue', (req, res) => {
      const issueDTO = req.body;
      issueDTO.createdBy = req.body.id;
      issueDTO.createdOn = new Date().getTime();
      IssueDAO.addIssue(issueDTO)
        .then(() => {
          res.status(200);
          res.send();
        })
        .catch(err => {
          res.status(400);
          res.send(err);
        })
    });

    httpHandlers.patch('/v1/issue/changeType', (req, res) => {
      const { id, value } = req.body;
      IssueDAO.updateIssueType(id, value)
        .then(() => {
          res.status(200);
          res.send();
        })
        .catch(err => {
          res.status(400);
          res.send(err);
        });
    });

    httpHandlers.patch('/v1/issue/changeTitle', (req, res) => {
      const { id, value } = req.body;
      IssueDAO.updateIssueTitle(id, value)
        .then(() => {
          res.status(200);
          res.send();
        })
        .catch(err => {
          res.status(400);
          res.send(err);
        });
    });

    httpHandlers.patch('/v1/issue/changeDescription', (req, res) => {
      const { id, value } = req.body;
      IssueDAO.updateIssueDescription(id, value)
        .then(() => {
          res.status(200);
          res.send();
        })
        .catch(err => {
          res.status(400);
          res.send(err);
        });
    });

    httpHandlers.patch('/v1/issue/changeAssignee', (req, res) => {
      const { id, value } = req.body;
      IssueDAO.updateIssueAssignee(id, parseInt(value, 10))
        .then(() => {
          res.status(200);
          res.send();
        })
        .catch(err => {
          res.status(400);
          res.send(err);
        });
    });

    httpHandlers.patch('/v1/issue/changeState', (req, res) => {
      const { id, value } = req.body;
      IssueDAO.updateIssueState(id, value)
        .then(() => {
          res.status(200);
          res.send();
        })
        .catch(err => {
          res.status(400);
          res.send(err);
        });
    });
  }
}

const issueController = new IssueController();

module.exports = {
  IssueController: issueController,
};