let jwt = require('jsonwebtoken');
let config = require('../config');

function getJwtData(token) {
  try {
    let decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
  } catch(err) {
    return null;
  }
}

module.exports = {
  getJwtData
}