let config = require('./config');
const mongoose = require('mongoose');

mongoose.connect(config.conString, (err) => {
  if(!err) {
    console.log('Successfully connected to DB');
  }
  else {
    console.log('Error while connecting to DB', err);
  }
});

module.exports = mongoose;