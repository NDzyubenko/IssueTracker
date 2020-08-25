const isInTestEnv = require('../helpers').isInTestEnv;
const db = isInTestEnv() ?
  require('../../for-tests/db') : require('../../db');

const TypeDAO = (function(database) {
  function init() {
    database.run(
      `CREATE TABLE IF NOT EXISTS Type (
        typeName TEXT PRIMARY KEY
      )`
    , {}, (err) => {
      if (err) {
        throw err;
      }
      populateDB();
    });
  }

  function populateDB() {
    const types = ['Task', 'Bug'];

    types.forEach((type) => {
      database.get('SELECT * from Type WHERE typeName = $typeName', [
        type
      ], (err, res) => {
        if (!res) {
          insertType(type);
        }
      })
    });
  }

  function insertType(type) {
    database.run(`INSERT INTO Type (typeName) VALUES (?)`, type);
  }

  function getTypes() {
    return new Promise((resolve, reject) => {
      database.all('SELECT * FROM Type', {}, (err, res) => {
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
    insertType: isInTestEnv() ? insertType : undefined,    
    getTypes,
  };
})(db);

module.exports = TypeDAO;