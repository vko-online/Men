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


//follow current user route (not current session user)
exports.follow_unfollow = function(req, res){
    var profile = req.profile;
    var exist = profile.subscribers.filter(function(i){
        return utils.get_id(i) === utils.get_id(req.user);
    });
    var callback = function(err){
        if(err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            User.findById(profile._id)
                .populate('subscribers', 'displayName')
                .populate('friends', 'displayName')
                .populate('ratings')
                .exec(function(err_profile, user){
                    if(err_profile) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err_profile)
                        });
                    } else {
                        res.jsonp(builder.build(user, req.user));
                    }
                });
        }
    };

    if(exist.length) {
        profile.update({$pull: {'subscribers': req.user}}, callback);
    } else {
        profile.update({$push: {'subscribers': req.user}}, callback);
    }
};
