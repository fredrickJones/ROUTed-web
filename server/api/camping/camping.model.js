'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var CampingSchema = new Schema({
  name: {type: String, required: true},
  loc: {type: Array, index: "2d", required: true},
  price: {type: Number, required: true},
  description: String
});

module.exports = mongoose.model('Camping', CampingSchema);
