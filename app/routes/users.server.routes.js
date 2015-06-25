'use strict';
/**
 * Module dependencies.
 */
var passport = require('passport');
module.exports = function(app){
    // User Routes
    var users = require('../../app/controllers/users.server.controller');
    // Setting up the users profile api
    app.route('/users/me').get(users.requiresLogin, users.me);
    app.route('/users').get(users.requiresLogin, users.list);
    app.route('/users/friends').get(users.user_friends);
    app.route('/users/mmr').get(users.requiresLogin, users.by_mmr);
    app.route('/users/accounts').delete(users.requiresLogin, users.removeOAuthProvider);

    app.route('/users/:userId').put(users.requiresLogin, users.update);
    app.route('/users/:userId').get(users.requiresLogin, users.read);
    app.route('/users/:userId/follow_unfollow').post(users.requiresLogin, users.follow_unfollow);
    app.route('/users/accounts').delete(users.removeOAuthProvider);
    // Setting up the users password api
    app.route('/users/password').post(users.changePassword);
    app.route('/auth/forgot').post(users.forgot);
    app.route('/auth/reset/:token').get(users.validateResetToken);
    app.route('/auth/reset/:token').post(users.reset);
    // Setting up the users authentication api
    app.route('/auth/signup').post(users.signup);
    app.route('/auth/signin').post(users.signin);
    app.route('/auth/signout').post(users.signout);
    // Setting the facebook oauth routes
    app.route('/auth/facebook').get(passport.authenticate('facebook', {
        scope: ['email']
    }));
    app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));

    //Settings the vk oauth routes
    app.route('/auth/vk').get(passport.authenticate('vk', {scope: ['friends']}));
    app.route('/auth/vk/callback').get(users.oauthCallback('vk'));

    // Setting the twitter oauth routes
    app.route('/auth/twitter').get(passport.authenticate('twitter'));
    app.route('/auth/twitter/callback').get(users.oauthCallback('twitter'));

    // Setting the google oauth routes
    app.route('/auth/google').get(passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));
    app.route('/auth/google/callback').get(users.oauthCallback('google'));
    // Setting the linkedin oauth routes
    app.route('/auth/linkedin').get(passport.authenticate('linkedin'));
    app.route('/auth/linkedin/callback').get(users.oauthCallback('linkedin'));
    // Setting the github oauth routes
    app.route('/auth/github').get(passport.authenticate('github'));
    app.route('/auth/github/callback').get(users.oauthCallback('github'));
    // Finish by binding the user middleware
    app.param('userId', users.userByID);
};
