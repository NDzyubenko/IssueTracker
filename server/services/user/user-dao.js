const isInTestEnv = require('../helpers').isInTestEnv;
const db = isInTestEnv() ?
  require('../../for-tests/db') : require('../../db');

const UserDAO = (function(database) {
  function init() {
    database.run(
      `CREATE TABLE IF NOT EXISTS User (
        id INTEGER PRIMARY KEY,
        email TEXT UNIQUE,
        password TEXT,
        name TEXT
      )`
    );
  }

  function getUsers() {
    return new Promise((resolve, reject) => {
      database.all(`SELECT id, name, email
                    FROM User`, [], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  function getUser(id) {
    return new Promise((resolve, reject) => {
      database.get('SELECT * FROM User WHERE id = $id',
        id,
        (err, res) => {
          if (err || !res) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  function checkUserExists(email, password) {
    return new Promise((resolve, reject) => {
      database.get(`SELECT id
                    FROM User
                    WHERE email = $email AND password = $password`, {
        $email: email,
        $password: password,
      }, (err, res) => {
        if (err || !res) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  function insertUser(userDTO) {
    return new Promise((resolve, reject) => {
      if (!userDTO || !userDTO.email || !userDTO.password || !userDTO.name) {
        reject(new Error('Invalid User DTO'));
      }
      database.run(`INSERT INTO User(email, password, name)
                    VALUES ($email, $password, $name)`, {
        $email: userDTO.email,
        $password: userDTO.password,
        $name: userDTO.name,
      }, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  init();

  return {
    init: isInTestEnv() ? init : undefined,
    getUsers,
    getUser,
    insertUser,
    checkUserExists,
  };
})(db);

module.exports = UserDAO;