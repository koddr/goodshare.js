![goodshare-js-logo-github](https://user-images.githubusercontent.com/11155743/31406128-fc67d706-ae08-11e7-9a97-5f10a7006b31.jpg)

# goodshare.js

![npm version](https://badge.fury.io/js/goodshare.js.svg) [![jsDelivr download](https://data.jsdelivr.com/v1/package/npm/goodshare.js/badge?style=rounded)](https://www.jsdelivr.com/package/npm/goodshare.js) [![js es6](https://img.shields.io/badge/ECMAScript-6+-blue.svg?style=flat)](https://vuejs.org) [![license](https://img.shields.io/badge/license-MIT-yellow.svg?style=flat)](https://github.com/koddr/vue-goodshare/blob/master/LICENSE.md)

> Useful ~~jQuery plugin~~ modern JavaScript solution for share a link from your website to social networks or mobile messengers. Easy to install and configuring on any of your website!

### Features
Simple install, extensive documentation, developer support, **SEO friendly**, many options for customization of appearance, **clean code without scripts tracking user activity** on the page, **high speed**.

### Full Documentation & Demos

* https://koddr.github.io/goodshare.js/

### Installation

Install via `npm`:

``` bash
$ npm install goodshare.js --save
```

Or include from [jsDelivr](https://www.jsdelivr.com) CDN:

``` html
<script src="https://cdn.jsdelivr.net/npm/goodshare.js@4/goodshare.min.js"></script>
```

### Usage

Script works with any HTML tags: `<a>` or `<div>` or `<button>` or other.

> So you can choose any and add required attributes `data-social`.

For example:

``` html
<!-- Create button with share to Twitter -->
<button data-social="twitter">Share this to Twitter</button>

<!-- Create link with share to Facebook -->
<a href="#" data-social="facebook">Share this to Facebook</a>

<!-- Create div container with share to LinkedIn -->
<div data-social="linkedin">Share this to LinkedIn</div>

<!-- Create icon from Fontello.com with share to Google+ -->
<i class="icon-google-plus" data-social="googleplus"></i>
```

By default, `goodshare.js` search this tags for get title, description and image (for some social networks):

``` html
<head>
  <title>Current page title</title>
  <meta name="description" content="Current page description.">
  <link rel="apple-touch-icon" href="http://example.com/path/to/image.png">
  ...
</head>
```

If you want to add different `url`, `title`, `description` and `image` to share element&nbsp;&mdash; use special `data-*` attributes:

* `data-url` redefines `document.location.href`
* `data-title` redefines `document.title`
* `data-description` redefines `meta[name="description"]`
* `data-image` redefines `link[rel="apple-touch-icon"]`

> Note: Please keep in mind, not all social networks support all of them data attributes!

To display share count, just add `data-counter` attribute to HTML element that will contain numbers. For example:

``` html
<!-- Create link with share to Facebook and counter -->
<a href="#" data-social="facebook">
  Share this to Facebook
  <span data-counter="facebook"></span>
</a>
```

> You also may put this attribute to any element.

### Notes

- **No more depending on jQuery!** Since `4.x`, no longer support the old `goodshare.js` version ([3.2.9](https://github.com/koddr/goodshare.js/tree/3.2.9) and lower). Thank you jQuery, but ES6 is better and cleaner.
- **Browser support.** Since `4.x`, `goodshare.js` do not support Internet Explorer 10 and older (check [ES6 support](https://kangax.github.io/compat-table/es6/#ie11) table).

### Author & maintainers

Development and maintenance engaged by [Vic Shóstak](https://github.com/koddr) (aka Koddr).
If you want to say «thank you» and/or ask me about `goodshare.js` — [create new issue](https://github.com/koddr/goodshare.js/issues/new).

___
> ### Your assistance will help make project even better!
> 
> * [Donate with PayPal](https://www.paypal.me/koddr/9.99usd)
> * [Donate with Yandex.Money](https://money.yandex.ru/to/41001601525977/599)
> 
> #### Thanks for supporting!
___

### License

[The MIT License (MIT)](https://github.com/koddr/goodshare.js/blob/master/LICENSE.md)
