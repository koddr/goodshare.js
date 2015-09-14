/*
 *	@author Interactive agency "Central marketing" http://iacm.ru
 *	@copyright Copyright (c) 2015, Interactive agency "Central marketing"	
 *	@license http://opensource.org/licenses/MIT The MIT License (MIT)
 *	@version 3.0 at 14/09/2015 (16:50)
 *	
 *	goodshare.js
 *	
 *	Useful jQuery plugin that will help your website visitors share a link on social networks and microblogs.
 *	Easy to install and configuring on any of your website!
 */
;(function($, document, window, undefined) {	
	$(document).ready(function() {		
		goodshare = {
			init: function(_element, _options) {			    
				/*
				 *	Default options:
				 *	
				 *	(social) type = vk
				 *	url = current browser adress stroke
				 *	title = current document <title>
				 *	text = current document <meta name="description" ... />
				 *	image = current document <meta property="og:image" ... />
				 */				
				var self = goodshare, options = $.extend({
					type:	'vk',
					url:	location.href,
					title:	document.title,
					text:	$('meta[name="description"]').attr('content'),
					image:	$('meta[property="og:image"]').attr('content')
				}, $(_element).data(), _options);
				/*
				 *	Open popup
				 */				
				if (self.popup(link = self[options.type](options)) !== null) return false;		        
			},
			/*
			 *	Share link > Vkontakte
			 *	http://vk.com
			 */		    
			vk: function(_options) {			    
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:	'',
					image:	''
				}, _options);				
				return 'http://vk.com/share.php?'
					+ 'url='          + encodeURIComponent(options.url)
					+ '&title='       + encodeURIComponent(options.title)
					+ '&description=' + encodeURIComponent(options.text)
					+ '&image='       + encodeURIComponent(options.image);
			},		
			/*
			 *	Share link > Odnoklassniki
			 *	http://ok.ru
			 */		    
			ok: function() {			
				var options = $.extend({
					url:    location.href,
					text:   ''
				});				
				return 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1'
					+ '&st.comments=' + encodeURIComponent(options.text)
					+ '&st._surl='    + encodeURIComponent(options.url);			
			},		 
			/*
			 *	Share link > Facebook
			 *	http://facebook.com
			 */
			fb: function() {			
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					image:  '',
					text:   ''
				});				
				return 'http://www.facebook.com/sharer.php?'
					+ 'u='     + encodeURIComponent(options.url);			
			},		
			/*
			 *	Share link > LiveJournal
			 *	http://livejournal.com
			 */		    
			lj: function() {			
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				});				
				return 'http://livejournal.com/update.bml?'
					+ 'subject='        + encodeURIComponent(options.title)
					+ '&event='         + encodeURIComponent('<a href="' + options.url + '">' + options.title + '</a> ' + options.text)
					+ '&transform=1';			
			},		
			/*
			 *	Share link > Twitter
			 *	http://twitter.com
			 */		    
			tw: function() {			
				var options = $.extend({
					url:        location.href,
					title:      document.title
				});				
				return 'http://twitter.com/share?'
					+ 'url='      + encodeURIComponent(options.url)		
					+ '&text='      + encodeURIComponent(options.title);
			},		    
			/*
			 *	Share link > Google Plus
			 *	http://plus.google.com
			 */		    
			gp: function() {				
				var options = $.extend({
					url:    location.href
				});			
				return 'https://plus.google.com/share?url='
					+ encodeURIComponent(options.url);					
			},		
			/*
			 *	Share link > My@Mail.Ru
			 *	http://my.mail.ru
			 */		    
			mr: function() {			
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					image:  '',
					text:   ''
				});				
				return 'http://connect.mail.ru/share?'
					+ 'url='          + encodeURIComponent(options.url)
					+ '&title='       + encodeURIComponent(options.title)
					+ '&description=' + encodeURIComponent(options.text)
					+ '&imageurl='    + encodeURIComponent(options.image);			
			},		    
			/*
			 *	Share link > LinkedIn
			 *	http://linkedin.com
			 */		    
			li: function() {				
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				});				
				return 'http://www.linkedin.com/shareArticle?'
					+ 'url='       + encodeURIComponent(options.url);			        
			},			
			/*
			 *	Share link > tumblr
			 *	http://tumblr.com
			 */		    
			tm: function() {				
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				});				
				return 'http://www.tumblr.com/share/link?'
					+ 'url='		+ encodeURIComponent(options.url)
					+ '&name='     		+ encodeURIComponent(options.title)
					+ '&description='	+ encodeURIComponent(options.text);			        
			},			
			/*
			 *	Share link > Blogger
			 *	https://www.blogger.com
			 */		    
			bl: function() {				
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				});				
				return 'https://www.blogger.com/blog-this.g?'
					+ 'u='	+ encodeURIComponent(options.url)
					+ '&n='	+ encodeURIComponent(options.title);			        
			},			
			/*
			 *	Share link > Pinterest
			 *	http://www.pinterest.com
			 */		    
			pt: function() {				
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				});				
				return 'https://www.pinterest.com/pin/create/button/?'
					+ 'url='		+ encodeURIComponent(options.url)
					+ '&description='	+ encodeURIComponent(options.title);			        
			},			
			/*
			 *	Share link > Evernote
			 *	http://www.evernote.com
			 */		    
			en: function() {				
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				});				
				return 'https://www.evernote.com/clip.action?'
					+ 'url='	+ encodeURIComponent(options.url)
					+ '&title='	+ encodeURIComponent(options.title)
					+ '&body='	+ encodeURIComponent(options.text + '<br/><a href="' + options.url + '">' + options.title + '</a>');
			},			
			/*
			 *	Share link > Digg
			 *	http://www.digg.com
			 */		    
			di: function() {				
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				});				
				return 'http://digg.com/submit?'
					+ 'url='	+ encodeURIComponent(options.url)
					+ '&title='	+ encodeURIComponent(options.title);			        
			},			
			/*
			 *	Share link > Yandex.Zakladki
			 *	http://zakladki.yandex.ru
			 */		    
			yz: function() {				
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				});				
				return 'http://zakladki.yandex.ru/newlink.xml?'
					+ 'url='	+ encodeURIComponent(options.url)
					+ '&name='	+ encodeURIComponent(options.title)
					+ '&descr='	+ encodeURIComponent(options.text);			        
			},			
			/*
			 *	Share link > Reddit
			 *	http://www.reddit.com
			 */		    
			rd: function() {				
				var options = $.extend({
					url:    location.href,
					title:  document.title
				});				
				return 'http://www.reddit.com/submit?'
					+ 'url='	+ encodeURIComponent(options.url)
					+ '&title='	+ encodeURIComponent(options.title);			        
			},			
			/*
			 *	Share link > Surfingbird
			 *	http://www.surfingbird.ru
			 */		    
			sb: function() {				
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				});				
				return 'http://surfingbird.ru/share?'
					+ 'url='			+ encodeURIComponent(options.url)
					+ '&title='			+ encodeURIComponent(options.title)			        
					+ '&description='	+ encodeURIComponent(options.text);
			},					
			/*
			 *	Popup window
			 */		    
			popup: function(url) {			    
				return window.open(url, '', 'toolbar=0,status=0,scrollbars=0,width=626,height=436');			
			}		    
		};		
		/*
		 *	Share counter > Vkontakte
		 *	http://vk.com
		 */		
		$.getJSON('https://vk.com/share.php?act=count&index=1&url=' + encodeURIComponent(location.href) + '&callback=?', function(response) {});
		VK = {};
	        VK.Share = {};
		VK.Share.count = function(index, count) {
			if (count >= 1000) $('[data-counter="vk"]').text(count/1000 + 'k');
			else if (count >= 1000000) $('[data-counter="vk"]').text(count/1000000 + 'M');
			else $('[data-counter="vk"]').text(count);
	        };		
		/*
		 *	Share counter > Odnoklassniki
		 *	http://ok.ru
		 */
		$.getJSON('https://connect.ok.ru/dk?st.cmd=extLike&uid=1&ref=' + encodeURIComponent(location.href) + '&callback=?', function(response) {});
		ODKL = {};
		ODKL.updateCount = function(index, count) {
			if (count >= 1000) $('[data-counter="ok"]').text(count/1000 + 'k');
			else if (count >= 1000000) $('[data-counter="ok"]').text(count/1000000 + 'M');
			else $('[data-counter="ok"]').text(count);
		};
		/*
		 *	Share counter > Facebook
		 *	http://facebook.com
		 */
		$.getJSON('https://api.facebook.com/method/links.getStats?format=json&urls=' + encodeURIComponent(location.href) + '&format=json&callback=?', function(response) {
			if (response[0].share_count >= 1000) $('[data-counter="fb"]').text(response[0].share_count/1000 + 'k');
			else if (response[0].share_count >= 1000000) $('[data-counter="fb"]').text(response[0].share_count/1000000 + 'M');
			else $('[data-counter="fb"]').text(response[0].share_count);
	        });
		/*
		 *	Share counter > Twitter
		 *	http://twitter.com
		 */
		$.getJSON('http://urls.api.twitter.com/1/urls/count.json?url=' + encodeURIComponent(location.href) + '&callback=?', function(response) {
			if (response.count >= 1000) $('[data-counter="tw"]').text(response.count/1000 + 'k');
			else if (response.count >= 1000000) $('[data-counter="tw"]').text(response.count/1000000 + 'M');
			else $('[data-counter="tw"]').text(response.count);
	        });
		/*
		 *	Share counter > Google Plus
		 *	http://plus.google.com
		 */
		$.ajax({
			type: 'POST',
			url: 'https://clients6.google.com/rpc',
			processData: true,
			contentType: 'application/json',
			data: JSON.stringify({
				'method': 'pos.plusones.get',
				'id': location.href,
				'params': {
					'nolog': true,
					'id': location.href,
					'source': 'widget',
					'userId': '@viewer',
					'groupId': '@self'
				},
				'jsonrpc': '2.0',
				'key': 'p',
				'apiVersion': 'v1'
			}),
			success: function(response) {
				if (response.result.metadata.globalCounts.count >= 1000) $('[data-counter="gp"]').text(response.result.metadata.globalCounts.count/1000 + 'k');
				else if (response.result.metadata.globalCounts.count >= 1000000) $('[data-counter="gp"]').text(response.result.metadata.globalCounts.count/1000000 + 'M');
				else $('[data-counter="gp"]').text(response.result.metadata.globalCounts.count);
			}
	        });				
		/*
		 *	Init goodshare link click
		 */		
		$(document).on('click', '.goodshare', function(event) {			
			event.preventDefault();
			goodshare.init(this);
		});
	});	
})(jQuery, document, window);
