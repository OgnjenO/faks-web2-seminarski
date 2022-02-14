let mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');
let config = require('../config');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  hash: String,
  salt: String
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString('hex');
};

UserSchema.methods.validatePassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJwt = function(){
  return jwt.sign({
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    fullName: this.firstName + " " + this.lastName
  }, config.jwtSecret, {expiresIn: '7d'});
};

let UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;