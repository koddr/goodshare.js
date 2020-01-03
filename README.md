<h1 align="center">🚀 goodshare.js</h1>
<h4 align="center">Share a link from your website to social networks and mobile messengers</h4>

<p align="center">
  <img width="100%" src="https://user-images.githubusercontent.com/11155743/57580501-01d1b780-74b3-11e9-8dae-75434262bd98.png" alt="goodshare.js logo github"/>
</p>

<p align="center">
  <img src="https://badge.fury.io/js/goodshare.js.svg" alt="npm version"/>
  <img src="https://img.shields.io/badge/minified_and_gzipped-1.04_KB-blue.svg" alt="bundle size"/>
  <a href="https://www.jsdelivr.com/package/npm/goodshare.js" target="_blank">
    <img src="https://data.jsdelivr.com/v1/package/npm/goodshare.js/badge?style=rounded" alt="jsDelivr download"/>
  </a>
  <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat" alt="code style: prettier"/>
  <img src="https://img.shields.io/badge/license-MIT-yellow.svg?style=flat" alt="license"/>
  <a href="https://twitter.com/intent/tweet?text=Wow%20%F0%9F%91%8D%20Useful%20%23js%20solution%20for%20%23share%20a%20link%20from%20your%20%23website%20to%20%23social%20networks%20and%20mobile%20%23messengers%3A&url=https%3A%2F%2Fgithub.com%2Fkoddr%2Fgoodshare.js" target="_blank">
    <img src="https://img.shields.io/twitter/url/https/github.com/koddr/goodshare.js.svg" alt="twit link"/>
  </a>
</p>

<p align="center">
  A useful modern JavaScript solution for share a link from your website to social networks or mobile messengers.<br/>
  Easy to install and configuring on any of your website!
</p>

## The Why?

Simple install, **extensive documentation**, developer support, **SEO friendly**, small bundle size **1.04 KB** (with all dependencies, minified and gzipped), many options for customization of appearance, **clean code without scripts tracking user activity** on the page, **high speed**.

## [Docs](https://goodshare.js.org), [Change log](CHANGELOG.md)

## Installation

Install via `npm`:

```console
foo@bar:~$ npm install --save goodshare.js
```

Or include from [jsDelivr](https://www.jsdelivr.com) CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/goodshare.js@6/goodshare.min.js"></script>
```

## Usage

Works with any HTML tags: `<a>`, `<div>`, `<button>` or other. Choose any and add required attributes `data-social`.

> Full list of supported [social providers](https://goodshare.js.org/supported-social-networks) and [mobile messengers](https://goodshare.js.org/supported-mobile-messengers).

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

## Framework components

- Vue.js — https://github.com/koddr/vue-goodshare
- React.js — https://github.com/koddr/react-goodshare-components

## Size limit report

```console
foo@bar:~$ npm run size

  Time limit:   80 ms
  Size:         1.04 KB
  Loading time: 21 ms   on slow 3G
  Running time: 54 ms   on Snapdragon 410
  Total time:   75 ms
```

_Thanks to Andrey Sitnik [@ai/size-limit](https://github.com/ai/size-limit)._

## Developers

- Idea and active development by [Vic Shóstak](https://github.com/koddr) (aka Koddr).
- Collaborators:
  - [Ilya Reshetnikov](https://github.com/devxom) (aka devxom).

## Project assistance

If you want to say «thank you» or/and support active development `goodshare.js`:

1. Add a GitHub Star to project.
2. Twit about project [on your Twitter](https://twitter.com/intent/tweet?text=Wow%20%F0%9F%91%8D%20Useful%20%23js%20solution%20for%20%23share%20a%20link%20from%20your%20%23website%20to%20%23social%20networks%20and%20mobile%20%23messengers%3A&url=https%3A%2F%2Fgithub.com%2Fkoddr%2Fgoodshare.js).
3. Donate some money to project author via PayPal: [@paypal.me/koddr](https://paypal.me/koddr?locale.x=en_EN).
4. Join DigitalOcean at our [referral link](https://m.do.co/c/b41859fa9b6e) (your profit is **$100** and we get $25).

Thanks for your support! 😘 Together, we make this project better every day.

### Stargazers over time

[![Stargazers over time](https://starchart.cc/koddr/goodshare.js.svg)](https://starchart.cc/koddr/goodshare.js)

## License

MIT
