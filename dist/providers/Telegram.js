'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Telegram (https://telegram.org) provider.
 */

var Telegram = function () {
  function Telegram() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.href;

    _classCallCheck(this, Telegram);

    this.url = encodeURIComponent(url);
  }

  _createClass(Telegram, [{
    key: 'shareWindow',
    value: function shareWindow() {
      var share_url = 'https://telegram.me/share/url?url=' + this.url;

      document.body.querySelectorAll("[data-social=telegram]").forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share window', 'width=400, height=400');
        });
      });
    }
  }]);

  return Telegram;
}();

var telegram_share = exports.telegram_share = new Telegram().shareWindow();