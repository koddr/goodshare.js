# goodshare.js
Useful jQuery plugin that will help your website visitors share a link on social networks and microblogs. Easy to install and configuring on any of your website!
## Install
Download [goodshare.js](https://github.com/iacmru/goodshare.js/archive/master.zip) from GitHub. Place plugin file to your project folder:
* for development version: ``./path/to/your/project/folder/js/goodshare.js``
* for production version: ``./path/to/your/project/folder/js/goodshare.min.js``

Add in project template (or something else):

```javascript
<!-- jQuery 1.11.2 min version from Google CDN JS -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

<!-- checkit.js min version -->
<script src="../path/to/your/project/folder/js/goodshare.min.js"></script>
```
If you want place plugin via fast CDN (special thanks to [RawGit](https://rawgit.com/) project), use this:

```javascript
<script src="https://cdn.rawgit.com/iacmru/goodshare.js/master/goodshare.min.js"></script>
```

## List of supported social networks and microblogs

[ВКонтакте](http://vk.com), [Facebook](http://facebook.com), [Одноклассники](http://ok.ru), [Мой Мир@Mail.Ru](http://my.mail.ru), [Google+](http://plus.google.ru), [LinkedIn](http://linkedin.com), [Twitter](http://twitter.com), [LiveJournal](http://livejournal.com), [tumblr](http://tumblr.com), [Blogger](http://blogger.com), [Pinterest](http://pinterest.com), [Digg](http://digg.com), [Evernote](http://evernote.com), [Яндекс.Закладки](http://zakladki.yandex.ru).

If you don't see your social network, please [let us know](https://github.com/iacmru/goodshare.js#developer) and we'll try to add it!

## Usage

```html
<a class="goodshare" data-type="vk">ВКонтакте</a> 
<a class="goodshare" data-type="fb">Facebook</a> 
<a class="goodshare" data-type="tw">Twitter</a> 
<a class="goodshare" data-type="lj">LiveJournal</a> 
<a class="goodshare" data-type="ok">Одноклассники</a> 
<a class="goodshare" data-type="mr">Мой Мир@Mail.Ru</a> 
<a class="goodshare" data-type="gp">Google+</a> 
<a class="goodshare" data-type="li">LinkedIn</a> 
<a class="goodshare" data-type="tm">tumblr</a> 
<a class="goodshare" data-type="pt">Pinterest</a> 
<a class="goodshare" data-type="bl">Blogger</a> 
<a class="goodshare" data-type="di">Digg</a> 
<a class="goodshare" data-type="yz">Яндекс.Закладки</a> 
<a class="goodshare" data-type="en">Evernote</a>
```

## Developer

Development and maintenance of `goodshare.js` project engaged in [Interactive agency «Central marketing»](http://iacm.ru). If you want to write a «thank you» or ask us about something, use [this](mailto:support@iacm.ru) e-mail.

## License

[The MIT License (MIT)](https://github.com/iacmru/goodshare.js/blob/master/LICENSE)
