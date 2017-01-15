var mongoose = require('mongoose');



var Joigoose = require('joigoose')(mongoose);
var schemes = require('schemes');



var joiTrunkSchema = schemes.trunk;

//console.log('joiTrunkSchema', joiTrunkSchema);

var mongooseTrunkSchema = Joigoose.convert(joiTrunkSchema);


module.exports = mongooseTrunkSchema;