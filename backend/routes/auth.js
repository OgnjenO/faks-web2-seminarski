const express = require('express');
let { checkLogin } = require('../middleware/authMiddleware');
let User = require('../models/user');
let router = express.Router();

router.post('/register', (req, res) => {
  if(!(req.body.email && req.body.firstName && req.body.password)) {
    return res.status(400).json({message: 'Email, firstname and password are required'});
  }
  let user = new User();
  user.email = req.body.email;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName ? req.body.lastName : "";
  user.setPassword(req.body.password);

  user.save((err) => {
    if(err) {
      res.status(400).json({message: 'Error while registering user', data: err});
    } else {
      let token = user.generateJwt();
      res.status(200).json({message: 'Successfully created user', data: token});
    }
  });
});

router.post('/login', checkLogin, (req, res) => {
  let token = req.user.generateJwt();
  res.status(200).json({message: 'Successfully created user', data: token});
});

module.exports = router;