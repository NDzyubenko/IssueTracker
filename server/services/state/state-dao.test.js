const chai = require('chai');
const expect = chai.expect;

const db = require('../../for-tests/db');
const StateDAO = require('./state-dao');

describe('(DAO) StateDAO', () => {
  const getTable = () => {
    return new Promise((resolve, reject) => {
      db.get('SELECT name FROM sqlite_master WHERE type="table" AND name="State"',
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


  it('should create State table if it does no exist', () => {
    db.run('DROP TABLE IF EXISTS State', {}, () => {
      getTable()
        .then(table => {
          expect(table).to.be.undefined;
          StateDAO.init();
          return getTable();
        })
        .then(table => {
          setTimeout(() => {
            expect(table).to.not.be.undefined;
          }, 100);
        })
        .catch(() => {});
    });
  });

  it('should add initial data to State table if it is empty', () => {
    db.run('DELETE FROM State', {}, (err, res) => {
      StateDAO.populateDB();
      setTimeout(() => {
        StateDAO.getStates()
          .then(states => {
            expect(states.length).to.not.equal(0);
          })
          .catch(() => {});          
      }, 100);
    });
  });

  it('should add a state to table', () => {
    const state = 'TestState';
    db.run('DELETE FROM State', {}, (err, res) => {
      StateDAO.insertState(state);
      setTimeout(() => {
        StateDAO.getStates()
          .then(states => {
            expect(states[0].stateName).to.equal(state);
          })
          .catch(() => {});          
      }, 300);
    });
  });
})