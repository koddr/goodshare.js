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

`vk` [ВКонтакте](http://vk.com), `fb` [Facebook](http://facebook.com), `ok` [Одноклассники](http://ok.ru), `mr` [Мой Мир@Mail.Ru](http://my.mail.ru), `gp` [Google+](http://plus.google.ru), `li` [LinkedIn](http://linkedin.com), `tw` [Twitter](http://twitter.com), `lj` [LiveJournal](http://livejournal.com), `tm` [tumblr](http://tumblr.com), `bl` [Blogger](http://blogger.com), `pt` [Pinterest](http://pinterest.com), `di` [Digg](http://digg.com), `en` [Evernote](http://evernote.com), `yz` [Яндекс.Закладки](http://zakladki.yandex.ru).

If you don't see your social network, please [let us know](https://github.com/iacmru/goodshare.js#developer) and we'll try to add it!

## Description

Plugin works with any HTML tags, whether `<a>` or `<span>` or other. So you can choose any and add required attributes: `class="goodshare"` and `data-type=".."`. For example:

```html
<!-- Create button with share to Twitter -->
<button class="goodshare" data-type="tw">Share this to Twitter</button>

<!-- Create link with share to Facebook -->
<a href="#" class="goodshare" data-type="fb">Share this to Facebook</a>

<!-- Create div container with share to LinkedIn -->
<div class="goodshare" data-type="li">Share this to LinkedIn</div>
```

### Note for links `<a href="...">...</a>`

We use `event.preventDefault();` for event "click".

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
