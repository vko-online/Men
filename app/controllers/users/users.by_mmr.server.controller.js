// by bwin on 6/15/15.
'use strict';
/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors.server.controller.js'),
    mongoose = require('mongoose'),
    utils = require('../utils.server.controller'),
    builder = require('./builder.server.controller'),
    User = mongoose.model('User');
//
//get all by mmr
exports.by_mmr = function(req, res){
    var mmr = req.query.mmr;
    if(mmr){
        if(!_.isNumber(mmr)){
            mmr = parseInt(mmr);
        }
        User.find({mmr: {$lte: mmr}, _id: {$ne: utils.get_id(req.user)}},
            {
                password: 0,
                provider: 0,
                __v: 0,
                salt: 0,
                created: 0,
                loginToken: 0,
                coach_id: 0,
                loginExpires: 0,
                notifications: 0,
                roles: 0,
                subscribers: 0,
                friends: 0,
                email: 0,
                firstName: 0,
                lastName: 0
            })
            .sort('-mmr')
            .limit(5)
            .exec(function(err, users){
                if(err){
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.jsonp(users);
                }
            });
    } else {
        User.find({mmr: {$gt: 0}, _id: {$ne: utils.get_id(req.user)}},
            {
                password: 0,
                provider: 0,
                __v: 0,
                salt: 0,
                created: 0,
                loginToken: 0,
                coach_id: 0,
                loginExpires: 0,
                notifications: 0,
                roles: 0,
                subscribers: 0,
                friends: 0,
                email: 0,
                firstName: 0,
                lastName: 0
            })
            .sort('-mmr')
            .limit(5)
            .exec(function(err, users){
                if(err){
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.jsonp(users);
                }
            });
    }
};