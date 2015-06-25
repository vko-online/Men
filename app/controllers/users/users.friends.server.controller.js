'use strict';
/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors.server.controller.js'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');
//
//user friend
exports.user_friends = function(req, res){
    var friendId = req.query.userId;
    User.findById(friendId,
        {
            salt: 0,
            password: 0,
            email: 0,
            loginToken: 0,
            loginExpires: 0,
            firstName: 0,
            lastName: 0,
            coach_id: 0,
            created: 0,
            notifications: 0,
            provider: 0,
            roles: 0,
            subscribers: 0,
            username: 0
        }
    )
        .populate('friends', 'displayName mmr')
        .exec(function(err, db_friends){
            if(err){
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.jsonp(db_friends.friends);
            }
        });
};