![goodshare-js-logo-github](https://user-images.githubusercontent.com/11155743/31406128-fc67d706-ae08-11e7-9a97-5f10a7006b31.jpg)

# goodshare.js

![npm version](https://badge.fury.io/js/goodshare.js.svg) [![gzip](https://img.shields.io/badge/GZip_size-2.56_KB-green.svg?style=flat)](https://en.wikipedia.org/wiki/ECMAScript) [![jsDelivr download](https://data.jsdelivr.com/v1/package/npm/goodshare.js/badge?style=rounded)](https://www.jsdelivr.com/package/npm/goodshare.js) [![js es6](https://img.shields.io/badge/ECMAScript-6+-blue.svg?style=flat)](https://en.wikipedia.org/wiki/ECMAScript) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier) [![license](https://img.shields.io/badge/license-MIT-yellow.svg?style=flat)](https://github.com/koddr/vue-goodshare/blob/master/LICENSE)


Useful ~~jQuery plugin~~ modern JavaScript solution for share a link from your website to social networks or mobile messengers. Easy to install and configuring on any of your website!

### Features

Simple install, extensive documentation, developer support, **SEO friendly**, small bundle size **~36 KB** (or GZip **2.56 KB**), many options for customization of appearance, **clean code without scripts tracking user activity** on the page, **high speed**.

### Full Documentation & Demos

- https://goodsharejs.1wa.co

### Production-ready components

- Vue.js — https://github.com/koddr/vue-goodshare ([docs](https://koddr.github.io/vue-goodshare/))
- React — https://github.com/koddr/react-goodshare-components ([docs](https://koddr.github.io/react-goodshare-components/)) [WIP, [you can help](https://www.tinkoff.ru/sl/66oTDPEttx9) now!]

### Installation

Install via `npm`:

```console
foo@bar:~$ npm install --save goodshare.js
```

Or include from [jsDelivr](https://www.jsdelivr.com) CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/goodshare.js@6/goodshare.min.js"></script>
```

### Usage

Script works with any HTML tags: `<a>` or `<div>` or `<button>` or other.

> So you can choose any and add required attributes `data-social`.
>
> Full list of supported [social providers](https://koddr.github.io/goodshare.js/en/supported-social-networks.html) and [messengers](https://koddr.github.io/goodshare.js/en/supported-social-messengers.html).

For example:

```html
<!-- Create button with share to Twitter -->
<button data-social="twitter">Share this to Twitter</button>

<!-- Create link with share to Facebook -->
<a href="#" data-social="facebook">Share this to Facebook</a>

<!-- Create div container with share to LinkedIn -->
<div data-social="linkedin">Share this to LinkedIn</div>

<!-- Create icon from Fontello.com with share to Tumblr -->
<i class="icon-tumblr" data-social="tumblr"></i>
```

By default, `goodshare.js` search this tags for get title, description and image (for some social networks):

```html
<head>
  <title>Current page title</title>
  <meta name="description" content="Current page description.">
  <link rel="apple-touch-icon" href="http://example.com/path/to/image.png">
  ...
</head>
```

#### Change URL, title or else

If you want to add different `url`, `title`, `description` and `image` to share element&nbsp;&mdash; use special `data-*` attributes:

- `data-url` redefines `document.location.href`
- `data-title` redefines `document.title`
- `data-description` redefines `meta[name="description"]`
- `data-image` redefines `link[rel="apple-touch-icon"]`

> Note: Please keep in mind, not all social networks support all of them data attributes!

#### Dynamically update

If you want to dynamically update the data that will be used for share. You can call a method `Goodshare.reNewAllInstance()` that will update data in goodshare providers instance and update `EventListeners`.

> Note: For example, you have a widget to share content that generates images for sharing based on selected items or other user actions.

```js
// Update all data
// Goodshare instance expose in window._goodshare by default
window._goodshare.reNewAllInstance();
```

#### Display share count

To display share count, just add `data-counter` attribute to HTML element that will contain numbers. For example:

```html
<!-- Create link with share to Facebook and counter -->
<a href="#" data-social="facebook">
  Share this to Facebook
  <span data-counter="facebook"></span>
</a>
```

> You also may put this attribute to any element.

#### Detect share success

> Simply calls the handler when the hooking window is closed. Look more at [Issue #57](https://github.com/koddr/goodshare.js/issues/57)

```js
window._goodshare.setShareCallback(function() {
  console.log(arguments);
  // some logic for handling share events
});
```

## Size limit report

```console
foo@bar:~$ npm run size

  Time limit:   250 ms
  Package size: 2.56 KB with all dependencies, minified and gzipped
  Loading time: 52 ms   on slow 3G
  Running time: 165 ms  on Snapdragon 410
  Total time:   216 ms
```

_Thanks to Andrey Sitnik [@ai/size-limit](https://github.com/ai/size-limit)._

### Author & maintainers

Development and maintenance engaged by [Vic Shóstak](https://github.com/koddr) (aka Koddr).
If you want to say «thank you» and/or ask me about `goodshare.js` — [create new issue](https://github.com/koddr/goodshare.js/issues/new).

<a href="https://www.patreon.com/bePatron?u=20124951">
  <img width="200px" src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" alt="Become a Patron!"/>
</a>

## License

MIT
