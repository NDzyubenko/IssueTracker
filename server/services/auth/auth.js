const jwt = require('jsonwebtoken');

const secret = require('../../config').secret;

class Auth {
  createToken(userId) {
    const token = jwt.sign({ id: userId }, secret, {
      expiresIn: 3600, // 1 hour
    });

    return token;
  }

  tokenIsValid(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          reject();
        } else {
          resolve(decoded);
        }
      });
    });
  }
}

const auth = new Auth();

module.exports = {
  Auth: auth,
};
