var mongoose = require('mongoose');

var destSchema = new mongoose.Schema({
  tid: String,
  name: String,
  place: String,
  type: String,
  likes: Number
});

module.exports = mongoose.model('Destination', destSchema);
