



(function() {
	"use strict";

	$(window).on('action:posts.loaded, action:topic.loaded', function(event) {

		if (!$('.topic').length) {
			return;
 		}

		verifyLinks();
	});

	function verifyLinks() {
		$('[component="post/content"] a').each(function(index, element) {

			var link = $(element);
			if(link.attr('class') || link.attr('link-checked')) {
				return;
			}

			link.attr('link-checked', 1);

			socket.emit('plugins.linkCheck.checkLink', link.attr('href'), function(err, result) {
				if(!result) {
					$('<i class="fa fa-chain-broken linkcheck-plugin"></i>').insertBefore(link);
				}
			});
		});
	}
}());
