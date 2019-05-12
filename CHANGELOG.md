# Change log

## 6.x

- `6.1.2`: pushed to master only if limit `250 ms` is passed.
- `6.1.0`: added Flipboard and WeChat; switch StumbleUpon to Mix; deleted GooglePlus.
- `6.0.3`: goodshare.js only support: MSIE 11+, Edge 13+, Google Chrome 59+ and FireFox 50+.
- `6.0.2`: drop `./goodshare.polyfill.min.js` and separated [Array Polyfill](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from?v=control#Polyfill) from `./src/polyfills`.
- `6.0.0`: goodshare.js have two versions — with (`./goodshare.polyfill.min.js`) and without (`./goodshare.min.js`) [Array Polyfill](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from?v=control#Polyfill).

## 5.x

- `5.2.0`: drop support Webpack 3 and now bundled with [Rollup.js](https://github.com/rollup/rollup). It saved over ~55 Kb of bundle size! Wow!

## 4.x

- `4.0.0`: no longer support the old goodshare.js version ([3.2.9](https://github.com/koddr/goodshare.js/tree/3.2.9) and lower). Thank you jQuery, but ES6 is better and cleaner. Drop support Microsoft Internet Explorer 8 and older.