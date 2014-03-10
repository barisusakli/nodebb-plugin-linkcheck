'use strict';

var request = require('request'),
	socketTopics = module.parent.require('./socket.io/topics');


var ttl = 60000;
var cache = {};


socketTopics.checkLink = function(socket, link, callback) {
	var now = Date.now();

	if (link.slice(0, 2) === '//') {
		link = 'http:' + link;
	}

	if(cache[link] && now < cache[link].expireAt) {
		return callback(null, cache[link].state);
	}

	request({url:link, method:'HEAD'}, function (error, response) {
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



