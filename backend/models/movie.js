let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number
  },
  stars: {
    type: String
  },
  producent: {
    type: String
  },
  userId: {
    type: String,
    required: true
  }
});

let MovieModel = mongoose.model('movie', MovieSchema);

module.exports = MovieModel;