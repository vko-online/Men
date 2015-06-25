'use strict';
/**
 * Module dependencies.
*/
var _ = require('lodash'),
    errorHandler = require('../errors.server.controller.js'),
    mongoose = require('mongoose'),
    builder = require('./builder.server.controller'),
    passport = require('passport'),
    utils = require('../utils.server.controller'),
    User = mongoose.model('User');


//get user of users/:user_id route
exports.read = function(req, res){
    var profile = req.profile;
    return res.json(builder.build(profile, req.user));
};


//all users
exports.list = function(req, res){
    var skip = req.query.skip;
    var limit = req.query.limit;
    var query = req.query.q;
    //TODO: shall we filter by user sport_type?
    //var sport_type = utils.get_id(req.user.sport_type);
    var filter = {};
    if(query){
        //TODO: we should also filter by firstName and lastName, and maybe by email
        var reg = new RegExp(query, 'i');
        filter.username= {$regex: reg};
    }
    //if(sport_type){
    //    filter.sport_type = sport_type;
    //}
    User.find(filter, {coach_id: 0, email: 0, firstName: 0, lastName: 0, notifications: 0, roles: 0, password: 0, provider: 0, __v: 0, salt: 0, created: 0, loginToken: 0, loginExpires: 0, friends: 0})
        .sort('-mmr')
        .skip((skip || 0))
        .limit((limit || 10))
        .exec(function(err, users){
            if(err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.jsonp(users);
            }
        });
};
/**
 * Update user details
 */
exports.update = function(req, res){
    // Init Variables
    var user = req.user;
    var message = null;
    // For security measurement we remove the roles from the req.body object
    delete req.body.roles;
    if(user) {
        // Merge existing user
        user = _.extend(user, req.body);
        user.updated = Date.now();
        user.displayName = user.firstName + ' ' + user.lastName;
        user.save(function(err){
            if(err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                req.login(user, function(err){
                    if(err) {
                        res.status(400).send(err);
                    } else {
                        res.json(user);
                    }
                });
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};
/**
 * Send User
 */
exports.me = function(req, res){
    var user = req.user;
    if(user){
        user.salt = undefined;
        user.password = undefined;
    } else {
        res.status(401).send({
            message: 'User is not signed in'
        });
    }
    res.json(user);
};
