# Customize share link

If you want to replace any default share parameters&nbsp;&mdash; edit social network provider and re-build script.

``` js
export const vkontakte_share = new Vkontakte(
    'http://example.com/', // URL
    'New title of current page', // title
    'New description of current page.', // description
    'http://example.com/path/to/new-image.jpg' // image
).shareWindow();
```

> Please keep in mind, not all social networks support all of them share parameters!