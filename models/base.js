var mongoose = require('mongoose');


var Joigoose = require('joigoose')(mongoose);
var Joi = require('joi');
//var schemes = require('schemes');


var joiUserSchema = Joi.object({
    name: Joi.object({
        first: Joi.string().required(),
        last: Joi.string().required()
    }),
    email: Joi.string().email().required(),
    bestFriend: Joi.string().meta({ type: 'ObjectId', ref: 'User' }),
    metaInfo: Joi.any()
});

//console.log('joiUserSchema', joiUserSchema);

var mongooseBaseSchema = Joigoose.convert(joiUserSchema);

module.exports = mongooseBaseSchema;