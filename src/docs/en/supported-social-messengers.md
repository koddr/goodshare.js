# Supported messengers

> If you don't see your messenger, please [let us know](https://github.com/koddr/goodshare.js/issues/new) and we'll try to add it!

- `skype` [Skype](https://skype.com)
- `sms` Send text via SMS
- `telegram` [Telegram](https://telegram.org)
- `whatsapp` [WhatsApp](http://www.whatsapp.com)

## Note for Telegram Instant View

If you want to create share links with Instant View, follow the [official docs](https://instantview.telegram.org/docs) please. And then, add to your Telegram share link new data-attribute `data-rhash` with your template ID as value.

For example:

```html
<button data-rhash="xxxxx123456" data-social="telegram">
  Share link to Telegram
</button>
```
