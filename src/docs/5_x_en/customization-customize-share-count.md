# Customize share counter

If you want to replace default share counter URL&nbsp;&mdash; edit social network provider and re-build script.

``` js
export const vkontakte_counter = new Vkontakte(
    'http://example.com/' // URL
).getCounter();
```

> Please keep in mind, not all social networks supports share counter!