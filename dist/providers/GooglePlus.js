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
 *  Google Plus (https://plus.google.com) provider.
 */

var GooglePlus = function () {
  function GooglePlus() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.href;

    _classCallCheck(this, GooglePlus);

    this.url = encodeURIComponent(url);
  }

  _createClass(GooglePlus, [{
    key: 'shareWindow',
    value: function shareWindow() {
      var share_url = 'https://plus.google.com/share?url=' + this.url;

      document.body.querySelectorAll('[data-social=googleplus]').forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
      });
    }
  }, {
    key: 'getCounter',
    value: function getCounter() {
      var script = document.createElement('script');
      var callback = ('cb_' + Math.random()).replace('.', '');
      var count_url = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="https://plusone.google.com/_/+1/fastbutton?url=' + this.url + '" and xpath="*"') + '&callback=' + callback;

      window[callback] = function (counter) {
        document.body.querySelectorAll('[data-counter=googleplus]').forEach(function (item) {
          item.innerHTML = counter.results[0].match(/javascript">window.__SSR = \{c: (\d+).0/) != null ? counter.results[0].match(/javascript">window.__SSR = \{c: (\d+).0/)[1] / 1 : 0;
        });

        script.parentNode.removeChild(script);
      };

      script.src = count_url;
      document.body.appendChild(script);
    }
  }]);

  return GooglePlus;
}();

var googleplus_share = exports.googleplus_share = new GooglePlus().shareWindow();
var googleplus_counter = exports.googleplus_counter = new GooglePlus().getCounter();