'use strict';

var request = require('request'),
	nconf = module.parent.require('nconf'),
	socketPlugins = module.parent.require('./socket.io/plugins');


var ttl = 60000;
var cache = {};

socketPlugins.linkCheck = {}

socketPlugins.linkCheck.checkLink = function(socket, link, callback) {

	if (link.slice(0, 2) === '//') {
		link = 'http:' + link;
	}

	if (link[0] === '/') {
		link = nconf.get('url') + link;
	}

	var now = Date.now();

	if (cache[link] && now < cache[link].expireAt) {
		return callback(null, cache[link].state);
	}

	request({url:link, method:'HEAD', timeout: 5000}, function (error, response) {
		var state = !error && response.statusCode == 200;

		setCache(link, now, state);
		callback(null, state);
	});
};


function setCache(link, now, state) {
	cache[link] = {
		expireAt: now + ttl,
		state: state
	};
}



