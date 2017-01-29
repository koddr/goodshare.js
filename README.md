![goodshare.js logo github](https://koddr.me/images/projects/goodshare-js-logo-github.jpg)

# goodshare.js [![npm version](https://badge.fury.io/js/goodshare.js.svg)](https://badge.fury.io/js/goodshare.js)

Useful ~~jQuery plugin~~ modern JavaScript solution that will help your website visitors share a link on social networks and microblogs or mobile messengers. Easy to install and configuring on any of your website!

**Warning! No more depending on jQuery!** Since `4.0.0`, we'll no longer support the old `goodshare.js` version (`3.2.9` and lower). Thank you jQuery, but ES6 is better and cleaner.

### Features
Simple install, extensive documentation, developer support, **SEO friendly**, many options for customization of appearance, **clean code without scripts tracking user activity** on the page, **high speed**.

### Live demo

~~Yes. We have a simple live demo! [Just click me](https://koddr.me/projects/examples/goodshare-js) :D~~ Comming soon.

## Install via `npm` (recommended)

```bash
$ npm install goodshare.js --save
```

## Work through CDN

```html
<!-- goodshare.js minify version -->
<script src="https://cdn.jsdelivr.net/jquery.goodshare.js/4/goodshare.min.js"></script>
```

## Old way to install

Download [goodshare.min.js](https://raw.githubusercontent.com/koddr/goodshare.js/master/goodshare.min.js) and place file to your project template (before close `body` tag):

```html
<!-- goodshare.js minify version -->
<script src="/path/to/goodshare.min.js"></script>
```

## List of supported social networks and microblogs

* `vkontakte` [Вконтакте](http://vk.com)
* `facebook` [Facebook](http://facebook.com)
* `odnoklassniki` [Одноклассники](http://ok.ru)
* `mymailru` [Мой Мир@Mail.Ru](http://my.mail.ru)
* `googleplus` [Google Plus](http://plus.google.com)
* `linkedin` [LinkedIn](http://linkedin.com)
* `twitter` [Twitter](http://twitter.com)
* `livejournal` [LiveJournal](http://livejournal.com)
* `tumblr` [Tumblr](http://tumblr.com)
* `blogger` [Blogger](http://blogger.com)
* `pinterest` [Pinterest](http://pinterest.com)
* `digg` [Digg](http://digg.com)
* `evernote` [Evernote](http://evernote.com)
* `reddit` [Reddit](http://reddit.com)
* `delicious` [Delicious](http://www.delicious.com)
* `stumbleupon` [StumbleUpon](http://www.stumbleupon.com)
* `pocket` [Pocket](https://getpocket.com)
* `surfingbird` [Surfingbird](http://surfingbird.ru)
* `liveinternet` [LiveInternet](http://liveinternet.ru)
* `buffer` [Buffer](http://buffer.com)
* `instapaper` [Instapaper](http://www.instapaper.com)
* `readability` [~~Readability~~](http://www.readability.com)
* `xing` [Xing](http://www.xing.com)
* `wordpress` [WordPress](http://www.wordpress.com)
* `baidu` [Baidu](http://www.baidu.com)
* `renren` [RenRen](http://www.renren.com)
* `weibo` [Weibo](http://www.weibo.com)

**Note:** If you don't see your social network, please [let us know](https://github.com/koddr/goodshare.js/issues/new) and we'll try to add it!

### For iOS/Android mobile devices

* `telegram` [Telegram](https://telegram.org)
* `viber` [Viber](http://www.viber.com)
* `whatsapp` [WhatsApp](http://www.whatsapp.com)
* `line` [LINE](http://line.me/en/)

## Share links

Plugin works with any HTML tags: `<a>` or `<div>` or `<button>` or other. So you can choose any and add required attributes `data-social`. For example:

```html
<!-- Create button with share to Twitter -->
<button data-social="twitter">Share this to Twitter</button>

<!-- Create link with share to Facebook -->
<a href="#" data-social="facebook">Share this to Facebook</a>

<!-- Create div container with share to LinkedIn -->
<div data-social="linkedin">Share this to LinkedIn</div>

<!-- Create icon from Fontello.com with share to Google+ -->
<i class="icon-google-plus" data-social="googleplus"></i>
```

### Note for `description` and `image`

By default, `goodshare.js` search this tags for get description and image (for some social networks):

```html
<head>
  ...
  <meta name="description" content="Current page description."/>
  <link rel="image_src" href="http://your-site.com/path/to/image.jpg"/>
  ...
</head>
```

### Note for `<a>` links

We use `event.preventDefault()` for event «click». So don't be afraid to use links like this:

```html
<a href="#" data-social="...">My link</a>
```

## Share counters

To display counter, just add `data-counter` attribute to HTML element that will contain numbers. For example:

```html
<!-- Create link with share to Facebook and counter -->
<a href="#" data-social="facebook">
  Share this to Facebook
  <span data-counter="facebook"></span>
</a>
```

**Note:** You also may put this attribute to any element.

Value of `data-counter` attribute, see in this list of supported social networks and microblogs:

* `vkontakte` [Вконтакте](http://vk.com)
* `facebook` [Facebook](http://facebook.com)
* `odnoklassniki` [Одноклассники](http://ok.ru)
* `moimir` [Мой Мир@Mail.Ru](http://my.mail.ru)
* `googleplus` [Google Plus](http://plus.google.ru)
* `linkedin` [LinkedIn](http://linkedin.com)
* `tumblr` [Tumblr](http://tumblr.com)
* `pinterest` [Pinterest](http://pinterest.com)
* `reddit` [Reddit](http://reddit.com)
* `stumbleupon` [StumbleUpon](http://www.stumbleupon.com)
* `pocket` [Pocket](https://getpocket.com)
* `surfingbird` [Surfingbird](http://surfingbird.ru)
* `buffer` [Buffer](http://buffer.com)
* `xing` [Xing](http://www.xing.com)

**Note:** `Google Plus`, `Surfingbird`, `StumbleUpon`, `Pocket` and `Xing` counters use [Yahoo Query Language](https://developer.yahoo.com/yql) (YQL). It may impose some restrictions on use, associated with limit queries to Yahoo (we try to find another solution for this, if you know&nbsp;&mdash; [write issue to us](https://github.com/enjoyiacm/goodshare.js/issues/new)).

### How to get Twitter share counter after API 1.1 changes?

Simple solution for single domain: http://opensharecount.com

**Note:** We're **not** authors of the web site *opensharecount.com*, if something not working&nbsp;&mdash; write to their support please!

## How to reorganize social networks? Simple!

* First, clone `goodshare.js` repository to you computer:

```bash
$ cd ~/my-develop-dir/
$ git clone https://github.com/koddr/goodshare.js.git
```

* Next, open file `./src/goodshare.js` at your favorite IDE;
* Comment out or delete unwanted lines with social networks providers;
* Last, run build and packing to minify file (required [Babel](http://babeljs.io) and [Webpack](https://webpack.github.io)):

```bash
$ babel src -d dist
$ webpack ./dist/goodshare.js ./goodshare.min.js -p
```

### Customize share link

If you want to replace any default share parameters (URL, title, descripton, image)&nbsp;&mdash; just edit social network provider and re-build script.

```javascript
export let vkontakte_share = new Vkontakte(
  'http://your-another-site.com/', // URL
  'New title of current page', // title
  'New description of current page.', // description
  'http://your-another-site.com/path/to/new-image.jpg' // image
).shareWindow();
```

### Customize share counter

If you want to replace default share counter URL (get from `window.location.href`)&nbsp;&mdash; just edit social network provider and re-build script.

```javascript
export let vkontakte_counter = new Vkontakte(
  'http://your-another-site.com/' // URL
).getCounter();
```

## Modules for popular CMS

* Drupal 7.x: https://github.com/nosov33/drupal_goodshare

## Developers

Development and maintenance of `goodshare.js` project engaged by Vikky Shostak ([Koddr](https://koddr.me)). If you want to write a «thank you» or ask us about something, [use this e-mail](mailto:koddr.me@gmail.com).

## Your help

If you want help, we will be glad reviews about `goodshare.js` on personal blogs (including Twitter), online media and/or specialized IT-portals. Thank you!

## License

[The MIT License (MIT)](https://github.com/koddr/goodshare.js/blob/master/LICENSE.md)
