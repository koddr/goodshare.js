# Installation

### Direct Download / CDN

[https://www.jsdelivr.com/package/npm/goodshare.js](https://www.jsdelivr.com/package/npm/goodshare.js)

<!--email_off-->
[jsDelivr](https://www.jsdelivr.com) is a public, open-source CDN (Content Delivery Network) developed by [ProspectOne](https://prospectone.io), focused on performance, reliability, and security. It is free to use for everyone, with no bandwidth limits.
<!--/email_off-->

Include `goodshare.min.js` before close `body` tag:

``` html
<script src="/path/to/goodshare.min.js"></script>
```

Also, you can use a specific version, using a link like:

``` html
<script src="https://cdn.jsdelivr.net/npm/goodshare.js@4.0.0/goodshare.min.js"></script>
```

### npm

``` bash
$ npm install goodshare.js --save
```

When used with a module system:

``` js
require('goodshare.js');
```

> You don't need to do this when using global `script` tags.

### Dev Build

You will have to clone directly from GitHub and build `goodshare.js` yourself if
you want to use the latest dev build.

``` bash
$ git clone https://github.com/koddr/goodshare.js.git node_modules/goodshare.js
$ cd node_modules/goodshare.js
$ npm install
$ npm run build
```
