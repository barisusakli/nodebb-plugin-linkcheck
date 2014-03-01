

var request = require('request'),
	socketTopics = module.parent.require('./socket.io/topics');

(function(module) {
	"use strict";
	var ttl = 60000;
	var cache = {};

	socketTopics.checkLink = function(socket, link, callback) {
		var now = Date.now();

		if(cache[link] && now < cache[link].expireAt) {
			return callback(null, cache[link].state);
		}

		request({url:link, method:'HEAD'}, function (error, response, body) {
			var state = !error && response.statusCode == 200;

			setCache(link, now, state);
			callback(null, state);
		});
	}

	function setCache(link, now, state) {
		cache[link] = {
			expireAt: now + ttl,
			state: state
		};
	}

	module.addScripts = function(scripts, callback) {
		return scripts.concat([
			'plugins/nodebb-plugin-linkcheck/linkcheck/main.js'
		]);
	};


}(module.exports));

