#### Документацию и примеры на русском языке — вы можете [найти тут](http://goodshare.ru/).

# goodshare.js

Useful jQuery plugin that will help your website visitors share a link on social networks and microblogs. Easy to install and configuring on any of your website!

### Features
Simple install, can work through СDN, extensive documentation, developer support, SEO friendly, many options for customization of appearance, clean code without scripts tracking user activity on the page, high speed.

In ``v3.0`` we did:
* Add [share counters](https://github.com/enjoyiacm/goodshare.js#counters) for social networks:
  * Вконтакте
  * Одноклассники
  * Facebook
  * Twitter
  * Google Plus
* Re-bild script code & fix bugs.

### Demo
If you're looking for a simple basic demo, it's [here](http://goodshare.ru/examples.html).

## Install

[COMING SOON] Please go to our beautiful and functional configurator. [/COMING SOON]

Download [goodshare.js](https://github.com/enjoyiacm/goodshare.js/archive/master.zip) from GitHub. Place plugin file to your project folder: ``./path/to/your/project/folder/js/goodshare.min.js``.

Add in project template (or something else):

```javascript
<!-- jQuery 1.11.2 min version from Google CDN JS -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

<!-- goodshare.js minify version -->
<script src="../path/to/your/project/folder/js/goodshare.min.js"></script>
```
If you want place plugin via fast CDN (special thanks to [RawGit](https://rawgit.com/) project), use this:

```javascript
<script src="https://rawgit.com/enjoyiacm/goodshare.js/master/goodshare.min.js"></script>
```

## List of supported social networks and microblogs

* `vk` [Вконтакте](http://vk.com)
* `fb` [Facebook](http://facebook.com)
* `ok` [Одноклассники](http://ok.ru)
* `mr` [Мой Мир@Mail.Ru](http://my.mail.ru)
* `gp` [Google Plus](http://plus.google.ru)
* `li` [LinkedIn](http://linkedin.com)
* `tw` [Twitter](http://twitter.com)
* `lj` [LiveJournal](http://livejournal.com)
* `tm` [tumblr](http://tumblr.com)
* `bl` [Blogger](http://blogger.com)
* `pt` [Pinterest](http://pinterest.com)
* `di` [Digg](http://digg.com)
* `en` [Evernote](http://evernote.com)
* `rd` [Reddit](http://reddit.com)
* `yz` [Яндекс.Закладки](http://zakladki.yandex.ru)
* `sb` [Surfingbird](http://surfingbird.ru)

If you don't see your social network, please [let us know](https://github.com/enjoyiacm/goodshare.js#developer) and we'll try to add it!

## Description

Plugin works with any HTML tags: `<a>` or `<div>` or `<button>` or other. So you can choose any and add required attributes: class `goodshare` and `data-type`. For example:

```html
<!-- Create button with share to Twitter -->
<button class="goodshare" data-type="tw">Share this to Twitter</button>

<!-- Create link with share to Facebook -->
<a href="#" class="goodshare" data-type="fb">Share this to Facebook</a>

<!-- Create div container with share to LinkedIn -->
<div class="goodshare" data-type="li">Share this to LinkedIn</div>

<!-- Create icon from Fontello.com with share to Google+ -->
<i class="goodshare icon-google-plus" data-type="gp"></i>
```

### List of attributes

You can change these attributes as needed for your project:
<table>
<thead>
<tr>
<th>Attribute</th>
<th>Description (default: value)</th>
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

### Note for `<a>` links

We use `event.preventDefault()` for event "click". So don't be afraid to use links like this:
```html
<a href="#">My link</a>
```
## Counters

To display counter, just add an attribute ``data-counter`` to element that will container numbers. For example:

```html
<!-- Create link with share to Facebook and counter -->
<a href="#" class="goodshare" data-type="fb">
	Share this to Facebook
	<span data-counter="fb"></span>
</a>
```

Value of ``data-counter`` attribute, see in this list of supported social networks and microblogs:

* `vk` [Вконтакте](http://vk.com)
* `fb` [Facebook](http://facebook.com)
* `ok` [Одноклассники](http://ok.ru)
* `gp` [Google Plus](http://plus.google.ru)
* `tw` [Twitter](http://twitter.com)

## Usage example

This example shows one of decoration options with all supported social networks.

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
      a[data-type="rd"] {background: #ffcc00;}
      a[data-type="yz"] {background: #5f99cf;}
      a[data-type="sb"] {background: #26B1F6;}
    </style>
  </head>
  <body>
    <h1>My page with goodshare.js</h1>
    <p>Useful jQuery plugin that will help your website visitors share a link on social networks and microblogs.<br />
    Easy to install and configuring on any of your website!</p>
    <div>
      <a href="#" class="goodshare" data-type="vk">Вконтакте <span data-counter="vk"></span></a> 
      <a href="#" class="goodshare" data-type="fb">Facebook <span data-counter="fb"></span></a> 
      <a href="#" class="goodshare" data-type="tw">Twitter <span data-counter="tw"></span></a> 
      <a href="#" class="goodshare" data-type="lj">LiveJournal</a> 
      <a href="#" class="goodshare" data-type="ok">Одноклассники <span data-counter="ok"></span></a> 
      <a href="#" class="goodshare" data-type="mr">Мой Мир@Mail.Ru</a> 
      <a href="#" class="goodshare" data-type="gp">Google Plus <span data-counter="gp"></span></a> 
      <a href="#" class="goodshare" data-type="li">LinkedIn</a> 
      <a href="#" class="goodshare" data-type="tm">tumblr</a> 
      <a href="#" class="goodshare" data-type="pt">Pinterest</a> 
      <a href="#" class="goodshare" data-type="bl">Blogger</a> 
      <a href="#" class="goodshare" data-type="di">Digg</a> 
      <a href="#" class="goodshare" data-type="en">Evernote</a> 
      <a href="#" class="goodshare" data-type="rd">Reddit</a> 
      <a href="#" class="goodshare" data-type="yz">Яндекс.Закладки</a>
      <a href="#" class="goodshare" data-type="sb">Surfingbird</a>
    </div>
    <p>See goodshare.js on GitHub: https://github.com/enjoyiacm/goodshare.js</p>
    <!-- jQuery 1.11.2 min version from Google CDN JS -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <!-- goodshare.js minify version from RawGit CDN -->
    <script src="https://rawgit.com/enjoyiacm/goodshare.js/master/goodshare.min.js"></script>
  </body>
</html>
```

## Developer

Development and maintenance of `goodshare.js` project engaged in [Interactive agency «Central marketing»](http://iacm.ru). If you want to write a «thank you» or ask us about something, use [this](mailto:welcome@iacm.ru) e-mail.

## License

[The MIT License (MIT)](https://github.com/enjoyiacm/goodshare.js/blob/master/LICENSE)
