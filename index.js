

var fs = require('fs'),
	path = require('path'),
	async = require('async'),
	request = require('request'),
	topics = module.parent.require('./socket.io/topics');

(function(module) {
	"use strict";
	var ttl = 60000;
	var cache = {};

	topics.checkLink = function(socket, link, callback) {
		var now = Date.now();

		if(cache[link] && now < cache[link].expireAt) {
			return callback(null, cache[link].state);
		}

		request({url:link, method:'HEAD'}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				setCache(link, now, true);
				callback(null, true);
			} else {
				setCache(link, now, false);
				callback(null, false);
			}
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
			'plugins/nodebb-plugin-linkcheck/main.js'
		]);
	};


}(module.exports));

