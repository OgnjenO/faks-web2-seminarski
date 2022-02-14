const { deleteOne } = require('../models/user');
const User = require('../models/user');
let { getJwtData } = require('../utils/jwt');

function onlyValidJwt(req, res, next) {
  let token = req.get('auth-token');
  if(!token) {
    return res.status(400).json({message: 'No auth token'});
  }

  let data = getJwtData(token);
  if(!data) {
    return res.status(400).json({message: 'Invalid token'});
  }

  req.user = data;
  next();
}

function checkLogin(req, res, next) {
  if(!req.body.email || !req.body.password) {
    return res.status(400).json({message: 'Email and passwords are mandatory fields'});
  }

  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if(err || !user) {
      return res.status(400).json({message: 'Error while finding the user', error: err});
    }

    if(!user.validatePassword(req.body.password)) {
      return res.status(400).json({message: 'Invalid credentials'});
    }

    req.user = user;
    next();
  });
}

module.exports = {
  onlyValidJwt,
  checkLogin
}