// Module for API Routes (serving JSON)
module.exports = function(app) {
	var mongoose = require('mongoose'),
		User = require('../models/user');

	// Example API route
	app.get('/users', function(req, res) {
		// Checks the model collection and returns all of them`
		User.find(function(err, users) {
			// returns all people in JSON format
			res.send(users);
		});
	});

	// Example POST route
	app.post('/users', function (req, res) {
		User.create({
			username : req.body.username // Bound using Angular
		}, function(err, user) {
			if(err) {
				res.send(err);
			}
			User.find(function(err, users) {
				res.send(users);
			});
		});
	});

	// Example DELETE route
	app.delete('/users/:user_id', function (req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, model) {
			if(err) {
				res.send(err);
			}
			User.find(function(err, models) {
				res.send(models);
			});
		});
	});
};
