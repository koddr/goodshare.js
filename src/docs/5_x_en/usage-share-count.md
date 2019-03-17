# Share count

To display share count, just add `data-counter` attribute to HTML element **that will contain numbers**. For example:

``` html
<!-- Create link with share to Facebook and counter -->
<a href="#" data-social="facebook">
  Share this to Facebook
  <span data-counter="facebook"></span>
</a>
```

> Note: You also may put this attribute to any element.

### Social networks who have share counters

- `vkontakte` [Вконтакте](http://vk.com)
- `facebook` [Facebook](http://facebook.com)
- `odnoklassniki` [Одноклассники](http://ok.ru)
- `moimir` [Мой Мир@Mail.Ru](http://my.mail.ru)
- `linkedin` [LinkedIn](http://linkedin.com)
- `tumblr` [Tumblr](http://tumblr.com)
- `pinterest` [Pinterest](http://pinterest.com)
- `reddit` [Reddit](http://reddit.com)
- `stumbleupon` [StumbleUpon](http://www.stumbleupon.com)
- `pocket` [Pocket](https://getpocket.com)
- `surfingbird` [Surfingbird](http://surfingbird.ru)
- `buffer` [Buffer](http://buffer.com)
- `xing` [Xing](http://www.xing.com)

### How to get Twitter share counter after API 1.1 changes?

Simple solution for _only single_ domain: [OpenShareCount](http://opensharecount.com) project.

### How to get Google Plus share counter?

Google Plus drop support share count for [official +1 buttons](https://developers.google.com/+/web/share/). There is no way to get share count from Google Plus social network.

> If you know solution&nbsp;&mdash; [write issue to us](https://github.com/koddr/goodshare.js/issues/new).

### Share counter for Surfingbird, StumbleUpon, Pocket and Xing?

For getting share counts from this social networks `goodshare.js` use [Yahoo Query Language](https://developer.yahoo.com/yql) (YQL). It may impose some restrictions on use, associated with limit queries to Yahoo.

> If you know another solution&nbsp;&mdash; [write issue to us](https://github.com/koddr/goodshare.js/issues/new).