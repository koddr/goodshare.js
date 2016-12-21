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
 *  Xing (https://xing.com) provider.
 */

var Xing = function () {
  function Xing() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.href;

    _classCallCheck(this, Xing);

    this.url = encodeURIComponent(url);
  }

  _createClass(Xing, [{
    key: 'shareWindow',
    value: function shareWindow() {
      var share_url = 'https://www.xing.com/spi/shares/new?url=' + this.url;

      document.body.querySelectorAll('[data-social=xing]').forEach(function (item) {
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
      var count_url = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="https://www.xing-share.com/app/share?op=get_share_button;counter=top;url=' + this.url + '" and xpath="*"') + '&callback=' + callback;

      window[callback] = function (counter) {
        document.body.querySelectorAll('[data-counter=xing]').forEach(function (item) {
          item.innerHTML = counter.results.length > 0 ? counter.results[0].match(/span class="xing-count top">(\d+)</)[1] / 1 : 0;
        });

        script.parentNode.removeChild(script);
      };

      script.src = count_url;
      document.body.appendChild(script);
    }
  }]);

  return Xing;
}();

var xing_share = exports.xing_share = new Xing().shareWindow();
var xing_counter = exports.xing_counter = new Xing().getCounter();