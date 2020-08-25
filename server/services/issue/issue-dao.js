const db = process.env.NODE_ENV === 'test' ?
  require('../../for-tests/db') : require('../../db');

const IssueDAO = (function(database) {
  function init() {
    database.run(
      ` CREATE TABLE IF NOT EXISTS Issue (
        id INTEGER PRIMARY KEY,
        type TEXT,
        title TEXT,  
        assignedTo INTEGER,
        createdBy INTEGER,
        description TEXT,
        state TEXT,  
        createdOn INTEGER,
        FOREIGN KEY(type) REFERENCES Type(typeName),
        FOREIGN KEY(assignedTo) REFERENCES User(id),
        FOREIGN KEY(createdBy) REFERENCES User(id),
        FOREIGN KEY(state) REFERENCES State(stateName)
      )`
    );
  }

  function getOrderByString(orderByParams) {
    const supportedRows = [
      'type',
      'title',
      'description',
      'assignedTo',
      'createdBy',
      'state',
      'createdOn',
    ];
    let orderByStr = 'ORDER BY ';
    let parameterFound = false;
    for (let key in orderByParams) {
      if (supportedRows.indexOf(key) === -1) {
        continue;
      }
      const value = orderByParams[key];
      if (parameterFound) {
        orderByStr += ' , ';
      }
      orderByStr += `i.${key} ${value}`;
      parameterFound = true;
    }

    return parameterFound ? orderByStr : '';
  }

  function getAllIssues(orderByParams) {
    const orderByStr = getOrderByString(orderByParams);    

    return new Promise((resolve, reject) => {
      database.all(`SELECT
                      i.id,
                      i.type,
                      i.title,
                      i.assignedTo,
                      i.createdBy,
                      i.description,
                      i.state,
                      i.createdOn,
                      a.name as assignedToName,
                      c.name as createdByName
                    FROM Issue AS i
                    INNER JOIN User AS a
                      ON i.assignedTo = a.id
                    INNER JOIN User AS c
                      ON i.createdBy = c.id
                    ${orderByStr}`, (err, res) => {
        if (err || !res) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  function getIssue(id) {
    return new Promise((resolve, reject) => {
      database.get(`SELECT
                      i.id,
                      i.type,
                      i.title,
                      i.assignedTo,
                      i.createdBy,
                      i.description,
                      i.state,
                      i.createdOn,
                      a.name as assignedToName,
                      c.name as createdByName
                    FROM Issue AS i
                    INNER JOIN User AS a
                      ON i.assignedTo = a.id
                    INNER JOIN User AS c
                      ON i.createdBy = c.id
                    WHERE i.id = $id`, {
          $id: id,
        }, (err, res) => {
          if (err || !res) {
            reject(err);
          } else {
            resolve(res);
          }
      });
    });
  }

  function getOpenIssuesAssignedTo(userId, orderByParams) {
    const orderByStr = getOrderByString(orderByParams);

    return new Promise((resolve, reject) => {
      database.all(`SELECT
                      i.id,
                      i.type,
                      i.title,
                      i.assignedTo,
                      i.createdBy,
                      i.description,
                      i.state,
                      i.createdOn,
                      a.name as assignedToName,
                      c.name as createdByName
                    FROM Issue AS i
                    INNER JOIN User AS c
                      ON i.createdBy = c.id
                    INNER JOIN User AS a
                      ON i.assignedTo = a.id
                    WHERE i.assignedTo = $id AND i.state != (SELECT stateName
                                                             FROM State
                                                             WHERE stateName = "Closed")
                    ${orderByStr}`, {
        $id: userId,
      }, (err, res) => {
        if (err || !res) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  function addIssue(issueDTO) {
    return new Promise((resolve, reject) => {
      database.run(`INSERT INTO Issue(type, title, description, state, assignedTo, createdBy, createdOn)
                    VALUES(
                      (SELECT typeName FROM TYPE WHERE typeName = $type),
                      $title,
                      $description,
                      (SELECT stateName FROM State WHERE stateName = "New"),
                      (SELECT id FROM User WHERE id = $assignedTo),
                      (SELECT id FROM User WHERE id = $createdBy),
                      $createdOn
                    )`, {
          $type: issueDTO.type,
          $title: issueDTO.title,
          $description: issueDTO.description,
          $assignedTo: issueDTO.assignedTo,
          $createdBy: issueDTO.createdBy,
          $createdOn: issueDTO.createdOn,
        }, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
    });
  }

  function updateIssueType(id, type) {
    return new Promise((resolve, reject) => {
      database.run(`UPDATE Issue
                    SET type = (SELECT typeName
                                FROM Type
                                WHERE typeName = $type)
                    WHERE id = $id`, {
        $id: id,
        $type: type,
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  function updateIssueTitle(id, title) {
    return new Promise((resolve, reject) => {
      database.run(`UPDATE Issue
                    SET title = $title
                    WHERE id = $id`, {
          $id: id,
          $title: title,
        }, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
    });
  }

  function updateIssueDescription(id, description) {
    return new Promise((resolve, reject) => {
      database.run(`UPDATE Issue
                    SET description = $description
                    WHERE id = $id`, {
          $id: id,
          $description: description,
        }, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
    });
  }

  function updateIssueAssignee(id, assignedTo) {
    return new Promise((resolve, reject) => {
      database.run(`UPDATE Issue
                    SET assignedTo = (SELECT id
                                      FROM User
                                      WHERE id = $assignedTo)
                    WHERE id = $id`, {
          $id: id,
          $assignedTo: assignedTo,
        }, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
    });
  }

  function updateIssueState(id, state) {
    return new Promise((resolve, reject) => {
      database.run(`UPDATE Issue
                    SET state = (SELECT stateName
                                 FROM State
                                 WHERE stateName = $state)
                    WHERE id = $id`, {
          $id: id,
          $state: state,
        }, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
    });
  }

  init();

  return {
    getAllIssues,
    getIssue,
    getOpenIssuesAssignedTo,
    addIssue,
    updateIssueType,
    updateIssueTitle,
    updateIssueDescription,
    updateIssueAssignee,
    updateIssueState,
  }
})(db);

module.exports = IssueDAO;