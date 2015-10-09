'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	articles = require('../../app/controllers/articles.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/articles')
		.get(articles.list)
		.post(users.requiresLoginToken, articles.create);

	app.route('/articles/:articleId')
		.get(users.requiresLoginToken, articles.read)
		.put(users.requiresLoginToken, articles.hasAuthorization, articles.update)
		.delete(users.requiresLoginToken, articles.hasAuthorization, articles.delete);

	// Finish by binding the article middleware
	app.param('articleId', articles.articleByID);
};