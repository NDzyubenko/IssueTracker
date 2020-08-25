const chai = require('chai');
const expect = chai.expect;

const db = require('../../for-tests/db');
const UserDAO = require('./user-dao');

describe('(DAO) UserDAO', () => {
  const getTable = () => {
    return new Promise((resolve, reject) => {
      db.get('SELECT name FROM sqlite_master WHERE type="table" AND name="User"',
        {},
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
  }


  it('should create User table if it does no exist', () => {
    db.run('DROP TABLE IF EXISTS User', {}, () => {
      getTable()
        .then(table => {
          expect(table).to.be.undefined;
          UserDAO.init();
          return getTable();
        })
        .then(table => {
          setTimeout(() => {
            expect(table).to.not.be.undefined;
          }, 100);
        });
    });
  });
})