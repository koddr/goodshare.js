# Social share link

Script works with **any HTML tags**. Choose any and add required attributes `data-social`. For example:

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

### Which data is getting by default?

By default, `goodshare.js` search this tags for get `title`, `description` and `image` (for some social networks):

```html
<head>
  <title>Current page title</title>
  <meta name="description" content="Current page description.">
  <link rel="apple-touch-icon" href="http://example.com/path/to/image.png">
  ...
</head>
```

> URL is getting from current web browser address line (`document.location.href`).

### How to dynamically update?

If you want to dynamically update the data that will be used for share. You can call a method `Goodshare.reNewAllInstance()` that will update data in goodshare providers instance and update `EventListeners`.

> Note: For example, you have a widget to share content that generates images for sharing based on selected items or other user actions.

```js
// Update all data
// Goodshare instance expose in window._goodshare by default
window._goodshare.reNewAllInstance();
```

### How to detect share success?

> Simply calls the handler when the hooking window is closed. Look more at [Issue #57](https://github.com/koddr/goodshare.js/issues/57)

```js
window._goodshare.setShareCallback(function() {
  console.log(arguments);
  // Some logic for handling share events
});
```

### How to change default data?

If you want to change default data for share element&nbsp;&mdash; use special `data-*` attributes:

- `data-url` redefines `document.location.href`
- `data-title` redefines `document.title`
- `data-description` redefines `meta[name="description"]`
- `data-image` redefines `link[rel="apple-touch-icon"]`

> Please keep in mind, not all social networks support all of them data attributes!
