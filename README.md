# goodshare.js
Useful jQuery plugin that will help your website visitors share a link on social networks and microblogs. Easy to install and configuring on any of your website!

Feature of this plugin: SEO friendly and many opportunities for customization of appearance.
## Install
Download [goodshare.js](https://github.com/iacmru/goodshare.js/archive/master.zip) from GitHub. Place plugin file to your project folder:
* for development version: ``./path/to/your/project/folder/js/goodshare.js``
* for production version: ``./path/to/your/project/folder/js/goodshare.min.js``

Add in project template (or something else):

```javascript
<!-- jQuery 1.11.2 min version from Google CDN JS -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

<!-- goodshare.js min version -->
<script src="../path/to/your/project/folder/js/goodshare.min.js"></script>
```
If you want place plugin via fast CDN (special thanks to [RawGit](https://rawgit.com/) project), use this:

```javascript
<script src="https://cdn.rawgit.com/iacmru/goodshare.js/master/goodshare.min.js"></script>
```

## List of supported social networks and microblogs

* `vk` [ВКонтакте](http://vk.com)
* `fb` [Facebook](http://facebook.com)
* `ok` [Одноклассники](http://ok.ru)
* `mr` [Мой Мир@Mail.Ru](http://my.mail.ru)
* `gp` [Google+](http://plus.google.ru)
* `li` [LinkedIn](http://linkedin.com)
* `tw` [Twitter](http://twitter.com)
* `lj` [LiveJournal](http://livejournal.com)
* `tm` [tumblr](http://tumblr.com)
* `bl` [Blogger](http://blogger.com)
* `pt` [Pinterest](http://pinterest.com)
* `di` [Digg](http://digg.com)
* `en` [Evernote](http://evernote.com)
* `yz` [Яндекс.Закладки](http://zakladki.yandex.ru)

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

### List of attributes

You can change these attributes as needed for your project:
<table>
<thead>
<tr>
<th>Attribute</th>
<th>Description (default value)</th>
</tr>
</thead>
<tbody>
<tr>
<td>data-type</td>
<td>[required] Type (name) of social network (default: "vk")</td>
</tr>
<tr>
<td>data-url</td>
<td>(optional) Current page URL (default: browser adress field)</td>
</tr>
<tr>
<td>data-title</td>
<td>(optional) Current page title (default: head title)</td>
</tr>
<tr>
<td>data-image</td>
<td>(optional) Current page image URL (default: meta property="og:image")</td>
</tr>
<tr>
<td>data-text</td>
<td>(optional) Current page description text (default: meta name="description")</td>
</tr>
</tbody>
</table>

### Note for `<a>...</a>` links

We use `event.preventDefault()` for event "click". So don't be afraid to use links like this:
```html
<a href="#">My link</a>
```

## Usage example

This example shows one of decoration options with all supported social networks. Colors were taken from [here](http://brandcolors.net/).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My page with goodshare.js</title>
    <style>
	  html, body {font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; text-align: center;}
      a {color: #ffffff; display: inline-block; width: 150px; padding: 10px; margin: 2px auto; cursor: pointer;}
      a[data-type="vk"] {background: #45668e;}
      a[data-type="fb"] {background: #3b5998;}
      a[data-type="tw"] {background: #55acee;}
      a[data-type="lj"] {background: #062734;}
      a[data-type="ok"] {background: #ed812b;}
      a[data-type="mr"] {background: #168de2;}
      a[data-type="gp"] {background: #dd4b39;}
      a[data-type="li"] {background: #0976b4;}
      a[data-type="tm"] {background: #35465c;}
      a[data-type="pt"] {background: #cc2127;}
      a[data-type="bl"] {background: #f57d00;}
      a[data-type="di"] {background: #000000;}
      a[data-type="en"] {background: #7ac142;}
      a[data-type="yz"] {background: #ffcc00;}
    </style>
  </head>
  <body>
    <h1>My page with goodshare.js</h1>
    <p>Useful jQuery plugin that will help your website visitors share a link on social networks and microblogs.<br />
	    Easy to install and configuring on any of your website!</p>
    <div>
      <a href="#" class="goodshare" data-type="vk">ВКонтакте</a> 
      <a href="#" class="goodshare" data-type="fb">Facebook</a> 
      <a href="#" class="goodshare" data-type="tw">Twitter</a> 
      <a href="#" class="goodshare" data-type="lj">LiveJournal</a> 
      <a href="#" class="goodshare" data-type="ok">Одноклассники</a> 
      <a href="#" class="goodshare" data-type="mr">Мой Мир@Mail.Ru</a> 
      <a href="#" class="goodshare" data-type="gp">Google+</a> 
      <a href="#" class="goodshare" data-type="li">LinkedIn</a> 
      <a href="#" class="goodshare" data-type="tm">tumblr</a> 
      <a href="#" class="goodshare" data-type="pt">Pinterest</a> 
      <a href="#" class="goodshare" data-type="bl">Blogger</a> 
      <a href="#" class="goodshare" data-type="di">Digg</a> 
      <a href="#" class="goodshare" data-type="en">Evernote</a> 
      <a href="#" class="goodshare" data-type="yz">Яндекс.Закладки</a>
    </div>
    <p>See goodshare.js on GitHub: https://github.com/iacmru/goodshare.js</p>
    <!-- jQuery 1.11.2 min version from Google CDN JS -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <!-- goodshare.js min version from RawGit CDN -->
    <script src="https://cdn.rawgit.com/iacmru/goodshare.js/master/goodshare.min.js"></script>
  </body>
</html>
```

## Developer

Development and maintenance of `goodshare.js` project engaged in [Interactive agency «Central marketing»](http://iacm.ru). If you want to write a «thank you» or ask us about something, use [this](mailto:support@iacm.ru) e-mail.

## License

[The MIT License (MIT)](https://github.com/iacmru/goodshare.js/blob/master/LICENSE)
