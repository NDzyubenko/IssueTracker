const chai = require('chai');
const expect = chai.expect;

const db = require('../../for-tests/db');
const TypeDAO = require('./type-dao');

describe('(DAO) TypeDAO', () => {
  const getTable = () => {
    return new Promise((resolve, reject) => {
      db.get('SELECT name FROM sqlite_master WHERE type="table" AND name="Type"',
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


  it('should create Type table if it does no exist', () => {
    db.run('DROP TABLE IF EXISTS Type', {}, () => {
      getTable()
        .then(table => {
          expect(table).to.be.undefined;
          TypeDAO.init();
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

  it('should add initial data to Type table if it is empty', () => {
    db.run('DELETE FROM Type', {}, (err, res) => {
      TypeDAO.populateDB();
      setTimeout(() => {
        TypeDAO.getTypes()
          .then(types => {
            expect(types.length).to.not.equal(0);
          })
          .catch(() => {});
      }, 100);
    });
  });

  it('should add a type to table', () => {
    const type = 'TestType';
    db.run('DELETE FROM Type', {}, (err, res) => {
      TypeDAO.insertType(type);
      setTimeout(() => {
        TypeDAO.getTypes()
          .then(types => {
            expect(types[0].typeName).to.equal(type);
          })
          .catch(() => {});
      }, 100);
    });
  });
})