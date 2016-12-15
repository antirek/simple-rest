var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var Loko = new Schema({
  owner: ObjectId,
  title: String,
  date: Date
});

module.exports = Loko;