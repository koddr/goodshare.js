/*
	@author Interactive agency "Central marketing" http://iacm.ru
	@copyright Copyright (c) 2015, Interactive agency "Central marketing"	
	@license http://opensource.org/licenses/MIT The MIT License (MIT)
	@version 2.0 at 24/02/2015 (19:45)
	
	goodshare.js
	
	Useful jQuery plugin that will help your website visitors share a link on social networks and microblogs.
	Easy to install and configuring on any of your website!
*/

;(function($, document, window, undefined) {
	
	$(document).ready(function() {
		
		goodshare = {
		    
			doit: function(_element, _options) {
			    
				/*
					Default options:
					
					(social) type = vk
					url = current browser adress stroke
					title = current document <title>
					image = current document <meta property="og:image" ... />
					text = current document <meta name="description" ... />
				*/
				
				var self = goodshare, 
					options = $.extend({
						type:	'vk',
						url:	location.href,
						title:	document.title,
						image:	$('meta[property="og:image"]').attr('content'),
						text:	$('meta[name="description"]').attr('content')
					},
					$(_element).data(), _options);
			            
				/*
					Open popup
				*/
				
				if (self.popup(link = self[options.type](options)) === null) {
				
					/*
						If popup don't open
					*/
				            
					if ($(_element).is('a')) {
					            
						/*
							If it's <a> put into href
						*/
					            
		                $(_element).prop('href', link);
		                return true;
				                
					}
					else {
				            
						/*
							If it's no <a> go to link
						*/
			                
		                location.href = link;
		                return false;
				                
					}
		        }
		        else {
			        
					/*
						Popup opened
					*/
			            
					return false;
				
		        }
		        
			},
		
			/*
				Vkontakte
				http://vk.com
			*/
		    
			vk: function(_options) {
			    
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					image:  '',
					text:   ''
				}, _options);
				
				return 'http://vkontakte.ru/share.php?'
					+ 'url='          + encodeURIComponent(options.url)
					+ '&title='       + encodeURIComponent(options.title)
					+ '&description=' + encodeURIComponent(options.text)
					+ '&image='       + encodeURIComponent(options.image)
					+ '&noparse=true';
					
			},
		
			/*
				Odnoklassniki
				http://ok.ru
			*/
		    
			ok: function(_options) {
			
				var options = $.extend({
					url:    location.href,
					text:   ''
				}, _options);
				
				return 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1'
					+ '&st.comments=' + encodeURIComponent(options.text)
					+ '&st._surl='    + encodeURIComponent(options.url);
			
			},
		 
			/*
				Facebook
				http://facebook.com
			*/
		    
			fb: function(_options) {
			
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					image:  '',
					text:   ''
				}, _options);
				
				return 'http://www.facebook.com/sharer.php?s=100'
					+ '&p[title]='     + encodeURIComponent(options.title)
					+ '&p[summary]='   + encodeURIComponent(options.text)
					+ '&p[url]='       + encodeURIComponent(options.url)
					+ '&p[images][0]=' + encodeURIComponent(options.image);
			
			},
		
			/*
				LiveJournal
				http://livejournal.com
			*/
		    
			lj: function(_options) {
			
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				}, _options);
				
				return 'http://livejournal.com/update.bml?'
					+ 'subject='        + encodeURIComponent(options.title)
					+ '&event='         + encodeURIComponent('<a href="' + options.url + '">' + options.title + '</a> ' + options.text)
					+ '&transform=1';
			
			},
		
			/*
				Twitter
				http://twitter.com
			*/
		    
			tw: function(_options) {
			
				var options = $.extend({
					url:        location.href,
					title:      document.title
				}, _options);
				
				return 'http://twitter.com/share?'
					+ 'text='      + encodeURIComponent(options.title)
					+ '&url='      + encodeURIComponent(options.url);
			
			},
		    
			/*
				Google+
				http://plus.google.com
			*/
		    
			gp: function(_options) {
				
				var options = $.extend({
					url:    location.href
				}, _options);
			
				return 'https://plus.google.com/share?url='
					+ encodeURIComponent(options.url);
					
			},
		
			/*
				My@Mail.Ru
				http://my.mail.ru
			*/
		    
			mr: function(_options) {
			
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					image:  '',
					text:   ''
				}, _options);
				
				return 'http://connect.mail.ru/share?'
					+ 'url='          + encodeURIComponent(options.url)
					+ '&title='       + encodeURIComponent(options.title)
					+ '&description=' + encodeURIComponent(options.text)
					+ '&imageurl='    + encodeURIComponent(options.image);
			
			},
		    
			/*
				LinkedIn
				http://linkedin.com
			*/
		    
			li: function(_options) {
				
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				}, _options);
				
				return 'http://www.linkedin.com/shareArticle?mini=true'
					+ '&url='       + encodeURIComponent(options.url)
					+ '&title='     + encodeURIComponent(options.title)
					+ '&summary='   + encodeURIComponent(options.text);
			        
			},
			
			/*
				tumblr
				http://tumblr.com
			*/
		    
			tm: function(_options) {
				
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				}, _options);
				
				return 'http://www.tumblr.com/share/link?'
					+ 'url='			+ encodeURIComponent(options.url)
					+ '&name='     		+ encodeURIComponent(options.title)
					+ '&description='	+ encodeURIComponent(options.text);
			        
			},
			
			/*
				Blogger
				https://www.blogger.com
			*/
		    
			bl: function(_options) {
				
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				}, _options);
				
				return 'https://www.blogger.com/blog-this.g?'
					+ 'u='	+ encodeURIComponent(options.url)
					+ '&n='	+ encodeURIComponent(options.title);
			        
			},
			
			/*
				Pinterest
				http://www.pinterest.com
			*/
		    
			pt: function(_options) {
				
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				}, _options);
				
				return 'https://www.pinterest.com/pin/create/button/?'
					+ 'url='			+ encodeURIComponent(options.url)
					+ '&description='	+ encodeURIComponent(options.title);
			        
			},
			
			/*
				Evernote
				http://www.evernote.com
			*/
		    
			en: function(_options) {
				
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				}, _options);
				
				return 'https://www.evernote.com/clip.action?'
					+ 'url='	+ encodeURIComponent(options.url)
					+ '&title='	+ encodeURIComponent(options.title)
					+ '&body='	+ encodeURIComponent(options.text + '<br/><a href="' + options.url + '">' + options.title + '</a>');

			},
			
			/*
				Digg
				http://www.digg.com
			*/
		    
			di: function(_options) {
				
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				}, _options);
				
				return 'http://digg.com/submit?'
					+ 'url='	+ encodeURIComponent(options.url)
					+ '&title='	+ encodeURIComponent(options.title);
			        
			},
			
			/*
				Yandex.Zakladki
				http://zakladki.yandex.ru
			*/
		    
			yz: function(_options) {
				
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				}, _options);
				
				return 'http://zakladki.yandex.ru/newlink.xml?'
					+ 'url='	+ encodeURIComponent(options.url)
					+ '&name='	+ encodeURIComponent(options.title)
					+ '&descr='	+ encodeURIComponent(options.text);
			        
			},
			
			/*
				Reddit
				http://www.reddit.com
			*/
		    
			rd: function(_options) {
				
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				}, _options);
				
				return 'http://www.reddit.com/submit?'
					+ 'url='	+ encodeURIComponent(options.url)
					+ '&title='	+ encodeURIComponent(options.title);
			        
			},
			
			/*
				Surfingbird
				http://www.surfingbird.ru
			*/
		    
			sb: function(_options) {
				
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				}, _options);
				
				return 'http://surfingbird.ru/share?'
					+ 'url='	+ encodeURIComponent(options.url)
					+ '&title='	+ encodeURIComponent(options.title);
			        
			},
					
			/*
				Popup
			*/
		    
			popup: function(url) {
			    
				return window.open(url, '', 'toolbar=0,status=0,scrollbars=1,width=626,height=436');
			
			}
		    
		};
		
		/*
			Init goodshare.go()
		*/
		
		$(document).on('click', '.goodshare', function(event) {
			
			event.preventDefault();
			goodshare.doit(this);
			
		});
		
	});
	
})(jQuery, document, window);
