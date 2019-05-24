# Detect share success

Calls the handler, when the hooking window is closed.

``` js
window._goodshare.setShareCallback(function() {
  console.log(arguments);
  // some logic for handling share events
});
```

> For more info, see [Issue #57](https://github.com/koddr/goodshare.js/issues/57).