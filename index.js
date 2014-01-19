

var fs = require('fs'),
	path = require('path'),
	async = require('async'),
	request = require('request'),
	topics = module.parent.require('./socket.io/topics');

(function(module) {
	"use strict";

	topics.checkLink = function(socket, link, callback) {
		request({url:link, method:'HEAD'}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				callback(null, true);
			} else {
				callback(null, false);
			}
		});
	}

	module.addScripts = function(scripts, callback) {
		return scripts.concat([
			'plugins/nodebb-plugin-linkcheck/main.js'
		]);
	};


}(module.exports));

