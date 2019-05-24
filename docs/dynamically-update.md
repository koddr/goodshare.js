# Dynamically update

If you want to dynamically update the data that will be used for share. You can call a method `reNewAllInstance()` that will update data in goodshare providers instance and update `EventListeners`.

``` js
// Update all data
window._goodshare.reNewAllInstance();
```

> `goodshare.js` instance expose in `window._goodshare` by default.