'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
	require('./users/users.authentication.server.controller'),
	require('./users/users.authorization.server.controller'),
	require('./users/users.password.server.controller'),
	require('./users/builder.server.controller'),
	require('./users/users.by_mmr.server.controller'),
	require('./users/users.follow_unfollow.server.controller'),
	require('./users/users.friends.server.controller'),
	require('./users/users.profile.server.controller')
);