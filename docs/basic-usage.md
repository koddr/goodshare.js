# Basic usage

Works with any HTML tags: `<a>`, `<div>`, `<button>` or other. Choose any and add required attributes `data-social`.

> Full list of supported [social providers](/supported-social-networks) and [mobile messengers](/supported-mobile-messengers).

``` html
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

``` html hl_lines="2 3 4"
<head>
  <title>Current page title</title>
  <meta name="description" content="Current page description.">
  <link rel="apple-touch-icon" href="http://example.com/path/to/image.png">
  ...
</head>
```