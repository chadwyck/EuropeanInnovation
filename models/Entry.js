var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var entrySchema = new mongoose.Schema({
  id: ObjectId,
  name: String,
  place: String,
  type: String,
  likes: Number
});

module.exports = mongoose.model('Entry', entrySchema);
