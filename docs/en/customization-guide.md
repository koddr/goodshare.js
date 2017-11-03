# Customization

### Customize share link

If you want to replace any default share parameters (URL, title, descripton, image)&nbsp;&mdash; just edit social network provider and re-build script.

``` js
export const vkontakte_share = new Vkontakte(
  'http://your-another-site.com/', // URL
  'New title of current page', // title
  'New description of current page.', // description
  'http://your-another-site.com/path/to/new-image.jpg' // image
).shareWindow();
```

### Customize share counter

If you want to replace default share counter URL (get from `window.location.href`)&nbsp;&mdash; just edit social network provider and re-build script.

``` js
export const vkontakte_counter = new Vkontakte(
  'http://your-another-site.com/' // URL
).getCounter();
```