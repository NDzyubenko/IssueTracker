const isInTestEnv = require('../helpers').isInTestEnv;
const db = isInTestEnv() ?
  require('../../for-tests/db') : require('../../db');

const StateDAO = (function(database) {
  function init() {
    database.run(
      `CREATE TABLE IF NOT EXISTS State (
        stateName TEXT PRIMARY KEY
      )`
    , {}, (err) => {
      if (err) {
        throw err;
      }
      populateDB();
    });
  }

  function populateDB() {
    const states = ['New', 'In Progress', 'Resolved', 'Closed'];

    states.forEach(stateName => {
      database.get('SELECT * from State WHERE stateName = $stateName', [
        stateName,
      ], (err, res) => {
        if (!res) {
          insertState(stateName);
        }
      });
    });
  }

  function insertState(state) {
    database.run('INSERT INTO State (stateName) VALUES (?)', state);
  }

  function getStates() {
    return new Promise((resolve, reject) => {
      database.all('SELECT * FROM State', [], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  init();

  return {
    init: isInTestEnv() ? init : undefined,
    populateDB: isInTestEnv() ? populateDB : undefined,
    insertState: isInTestEnv() ? insertState : undefined,
    getStates,
  };
})(db);

module.exports = StateDAO;