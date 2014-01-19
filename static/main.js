



(function() {
	"use strict";

	$(document).bind('DOMNodeInserted', function(event) {

		if(!$('.topic').length || $(event.target).hasClass('linkcheck-plugin')) {
			return;
 		}

		verifyLinks();
	});

	function verifyLinks() {
		$('.post-content a').each(function(index, element) {

			var link = $(element);
			if(link.attr('class') || link.attr('done')) {
				return;
			}

			link.attr('done', 1);

			socket.emit('topics.checkLink', link.attr('href'), function(err, result) {
				if(!result) {
					$('<i class="fa fa-chain-broken linkcheck-plugin"></i>').insertBefore(link);
				}
			});
		});
	}
}());