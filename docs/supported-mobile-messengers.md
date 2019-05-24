# Supported messengers

> If you don't see your messenger, please [let us know](https://github.com/koddr/goodshare.js/issues/new) and we'll try to add it!

- `sms` Send text via SMS
- `skype` [Skype](https://skype.com)
- `telegram` [Telegram](https://telegram.org)
- `viber` [Viber](http://www.viber.com)
- `whatsapp` [WhatsApp](http://www.whatsapp.com)
- `wechat` [WeChat](http://www.wechat.com)
- `line` [LINE](http://line.me/en/)

## Note for Telegram Instant View

If you want to create share links with Instant View, follow the [official docs](https://instantview.telegram.org/docs) please. And then, add to your Telegram share link new data-attribute `data-rhash` with your template ID as value.

For example:

``` html
<button data-rhash="xxxxx123456" data-social="telegram">
  Share link to Telegram
</button>
```
