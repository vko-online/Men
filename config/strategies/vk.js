// by bwin on 6/9/15.

'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    url = require('url'),
    VKontakteStrategy = require('passport-vkontakte').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');

module.exports = function() {
    // Use facebook strategy
    passport.use(new VKontakteStrategy({
            clientID: config.vk.clientID,
            clientSecret: config.vk.clientSecret,
            callbackURL: config.vk.callbackURL,
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {
            // Set the provider data and include tokens
            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;

            // Create the user OAuth profile
            var providerUserProfile = {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                provider: 'vk',
                providerIdentifierField: 'id',
                providerData: providerData
            };

            // Save the user OAuth profile
            users.saveOAuthUserProfile(req, providerUserProfile, done);
        }
    ));
};
